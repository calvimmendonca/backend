/**
 * Migração de senhas plain-text → bcrypt
 *
 * Uso:
 *   npx ts-node scripts/migrate-passwords.ts           # executa de verdade
 *   npx ts-node scripts/migrate-passwords.ts --dry-run # apenas lista o que seria alterado
 *
 * O script detecta automaticamente senhas já hasheadas (prefixo $2b$/$2a$)
 * e as ignora, tornando-o seguro para rodar mais de uma vez.
 */

import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

// Força protocolo simples (sem prepared statements) para evitar erro de
// plano cacheado no PgBouncer/Neon após ALTER TABLE.
const dbUrl = new URL(process.env.DATABASE_URL!);
if (!dbUrl.searchParams.has('pgbouncer')) {
  dbUrl.searchParams.set('pgbouncer', 'true');
}
process.env.DATABASE_URL = dbUrl.toString();

const BCRYPT_ROUNDS = 10;
const BCRYPT_PREFIX_RE = /^\$2[ab]\$/;

const isDryRun = process.argv.includes('--dry-run');

async function main() {
  const prisma = new PrismaClient();

  try {
    console.log(`\n=== Migração de senhas para bcrypt ===`);
    if (isDryRun) console.log('Modo DRY-RUN — nenhuma alteração será salva.\n');

    const usuarios = await prisma.tb_adm_usuario.findMany({
      select: { int_codusr: true, vch_lgnusr: true, vch_pswusr: true },
    });

    const pendentes = usuarios.filter(
      u => u.vch_pswusr && !BCRYPT_PREFIX_RE.test(u.vch_pswusr.trim()),
    );
    const jaHasheados = usuarios.length - pendentes.length;

    console.log(`Total de usuários:      ${usuarios.length}`);
    console.log(`Já hasheados (pulados): ${jaHasheados}`);
    console.log(`Para migrar:            ${pendentes.length}\n`);

    if (pendentes.length === 0) {
      console.log('Nada a fazer. Todas as senhas já estão em bcrypt.');
      return;
    }

    let ok = 0;
    let falhou = 0;

    for (const u of pendentes) {
      const senha = u.vch_pswusr!.trim();

      try {
        const hash = await bcrypt.hash(senha, BCRYPT_ROUNDS);

        if (!isDryRun) {
          await prisma.tb_adm_usuario.update({
            where: { int_codusr: u.int_codusr },
            data: { vch_pswusr: hash },
          });
        }

        console.log(`  [${isDryRun ? 'DRY' : 'OK'}] id=${u.int_codusr} login=${u.vch_lgnusr}`);
        ok++;
      } catch (err) {
        console.error(`  [ERRO] id=${u.int_codusr} login=${u.vch_lgnusr} →`, err);
        falhou++;
      }
    }

    console.log(`\nResultado: ${ok} migradas, ${falhou} com erro.`);
    if (isDryRun) console.log('\nNenhuma alteração foi salva (dry-run).');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(err => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
