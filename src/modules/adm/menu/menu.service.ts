import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async getMenuForUser(userId: number) {
    const rows = await this.prisma.tb_adm_menu.findMany({
      where: {
        chr_stamnu: 'S',
        chr_vsbmnu: 'S',
        tb_adm_grupo_menu: {
          some: {
            chr_flgsel: 'S',
            tb_adm_grupo_usuario: {
              tb_adm_usuario_grupo: {
                some: { int_codusr: userId },
              },
            },
          },
        },
      },
      include: {
        tb_adm_grupo_menu: {
          where: {
            chr_flgsel: 'S',
            tb_adm_grupo_usuario: {
              tb_adm_usuario_grupo: {
                some: { int_codusr: userId },
              },
            },
          },
          take: 1,
        },
      },
      orderBy: { int_ordmnu: 'asc' },
    });

    return rows.map((menu: (typeof rows)[number]) => ({
      int_codmnu: menu.int_codmnu,
      int_codmnupai: menu.int_codmnupai ?? null,
      vch_nommnu: menu.vch_nommnu,
      vch_rtamnu: menu.vch_rtamnu ?? null,
      vch_icnmnu: menu.vch_icnmnu ?? null,
      int_ordmnu: menu.int_ordmnu,
      chr_stamnu: menu.chr_stamnu,
      chr_vsbmnu: menu.chr_vsbmnu,
      chr_flhmnu: menu.chr_flhmnu,
      permissions: {
        select: menu.tb_adm_grupo_menu[0]?.chr_flgsel === 'S',
        insert: menu.tb_adm_grupo_menu[0]?.chr_flgisr === 'S',
        update: menu.tb_adm_grupo_menu[0]?.chr_flgalt === 'S',
        delete: menu.tb_adm_grupo_menu[0]?.chr_flgdel === 'S',
      },
    }));
  }
}
