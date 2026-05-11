import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

export interface MenuPermissao {
  int_codmnu:    number;
  vch_nommnu:    string;
  int_codmnupai: number | null;
  chr_flgsel:    string;
  chr_flgisr:    string;
  chr_flgalt:    string;
  chr_flgdel:    string;
}

@Injectable()
export class GrupoMenuService {
  constructor(private readonly prisma: PrismaService) {}

  async findMenusVinculados(grupoId: number): Promise<MenuPermissao[]> {
    const rows = await this.prisma.tb_adm_grupo_menu.findMany({
      where: { int_codgrpusr: grupoId },
      include: { tb_adm_menu: true },
      orderBy: { tb_adm_menu: { int_ordmnu: 'asc' } },
    });
    return rows.map(r => ({
      int_codmnu:    r.int_codmnu,
      vch_nommnu:    r.tb_adm_menu.vch_nommnu,
      int_codmnupai: r.tb_adm_menu.int_codmnupai ?? null,
      chr_flgsel:    r.chr_flgsel,
      chr_flgisr:    r.chr_flgisr,
      chr_flgalt:    r.chr_flgalt,
      chr_flgdel:    r.chr_flgdel,
    }));
  }

  async findMenusDisponiveis(grupoId: number): Promise<MenuPermissao[]> {
    const vinculados = await this.prisma.tb_adm_grupo_menu.findMany({
      where: { int_codgrpusr: grupoId },
      select: { int_codmnu: true },
    });
    const ids = vinculados.map(v => v.int_codmnu);

    const menus = await this.prisma.tb_adm_menu.findMany({
      where: {
        chr_stamnu: 'S',
        ...(ids.length > 0 ? { int_codmnu: { notIn: ids } } : {}),
      },
      orderBy: { int_ordmnu: 'asc' },
    });

    return menus.map(m => ({
      int_codmnu:    m.int_codmnu,
      vch_nommnu:    m.vch_nommnu,
      int_codmnupai: m.int_codmnupai ?? null,
      chr_flgsel:    'N',
      chr_flgisr:    'N',
      chr_flgalt:    'N',
      chr_flgdel:    'N',
    }));
  }

  async vincular(grupoId: number, menus: { int_codmnu: number; chr_flgsel: string; chr_flgisr: string; chr_flgalt: string; chr_flgdel: string }[]) {
    await this.prisma.tb_adm_grupo_menu.createMany({
      data: menus.map(m => ({
        int_codgrpusr: grupoId,
        int_codmnu:    m.int_codmnu,
        chr_flgsel:    m.chr_flgsel,
        chr_flgisr:    m.chr_flgisr,
        chr_flgalt:    m.chr_flgalt,
        chr_flgdel:    m.chr_flgdel,
      })),
      skipDuplicates: true,
    });
    return { vinculados: menus.length };
  }

  async desvincular(grupoId: number, menuIds: number[]) {
    const { count } = await this.prisma.tb_adm_grupo_menu.deleteMany({
      where: { int_codgrpusr: grupoId, int_codmnu: { in: menuIds } },
    });
    return { desvinculados: count };
  }

  async atualizarPermissoes(grupoId: number, menus: { int_codmnu: number; chr_flgsel: string; chr_flgisr: string; chr_flgalt: string; chr_flgdel: string }[]) {
    await Promise.all(menus.map(m =>
      this.prisma.tb_adm_grupo_menu.update({
        where: { int_codgrpusr_int_codmnu: { int_codgrpusr: grupoId, int_codmnu: m.int_codmnu } },
        data: { chr_flgsel: m.chr_flgsel, chr_flgisr: m.chr_flgisr, chr_flgalt: m.chr_flgalt, chr_flgdel: m.chr_flgdel },
      })
    ));
    return { atualizados: menus.length };
  }
}
