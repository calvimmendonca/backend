import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

const selectFields = {
  int_codusr:          true,
  int_codstausr:       true,
  int_codemp:          true,
  vch_lgnusr:          true,
  vch_nomusr:          true,
  int_codcgr:          true,
  int_codtipusr:       true,
  vch_pswusr:          true,
  vch_pswextusr:       true,
  tin_nivacsusr:       true,
  chr_flgsupvndusr:    true,
  // Identificação
  vch_cgccpfusr:       true,
  vch_idtusr:          true,
  vch_numcshregmdcusr: true,
  int_codram:          true,
  dat_datnscusr:       true,
  dat_datcadusr:       true,
  // Contato
  vch_numtelusr:       true,
  vch_numcelusr:       true,
  vch_creusr:          true,
  // Endereço
  vch_cepusr:          true,
  vch_endusr:          true,
  int_numendusr:       true,
  vch_baiusr:          true,
  vch_cidusr:          true,
  chr_estusr:          true,
  vch_obsusr:          true,
  // Acesso
  dat_hrainiusr:       true,
  dat_hrafimusr:       true,
  // Vínculos
  bin_codcli:          true,
  int_codfrn:          true,
  int_codrep:          true,
  // Vendas
  dec_pcndscmax:       true,
  int_codusrsup:       true,
  // Relações
  tb_adm_status_usuario:  { select: { vch_desstausr: true } },
  tb_adm_tipo_usuario:    { select: { vch_destipusr: true } },
  tb_adm_cargo:           { select: { vch_descgr:    true } },
  tb_adm_empresa:         { select: { vch_nomemp:    true } },
} as const;

const selectEmpresa = {
  int_codemp:    true,
  vch_nomemp:    true,
  vch_cgcemp:    true,
  vch_nomfntemp: true,
} as const;

const selectGrupo = {
  int_codgrpusr:    true,
  vch_desgrpusr:    true,
  chr_flgicpbcodds: true,
} as const;

function parseTimeField(value?: string): Date | undefined {
  if (!value) return undefined;
  if (/^\d{2}:\d{2}$/.test(value)) return new Date(`1970-01-01T${value}:00.000Z`);
  const d = new Date(value);
  return isNaN(d.getTime()) ? undefined : d;
}

function parseDateField(value?: string): Date | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  return isNaN(d.getTime()) ? undefined : d;
}

@Injectable()
export class UsuarioService {
  private readonly logger = new Logger(UsuarioService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.tb_adm_usuario.findMany({
        select: selectFields,
        orderBy: { vch_nomusr: 'asc' },
        take: 500,
      });
    } catch (err) {
      this.logger.error('Erro ao buscar usuários:', err);
      throw err;
    }
  }

  async findOne(id: number) {
    const usuario = await this.prisma.tb_adm_usuario.findUnique({
      where: { int_codusr: id },
      select: selectFields,
    });
    if (!usuario) throw new NotFoundException(`Usuário #${id} não encontrado`);
    return usuario;
  }

  async findSupervisores() {
    return this.prisma.tb_adm_usuario.findMany({
      where: { int_codtipusr: 14, chr_flgsupvndusr: 'S' },
      select: { int_codusr: true, vch_nomusr: true },
      orderBy: { vch_nomusr: 'asc' },
    });
  }

  create(dto: CreateUsuarioDto) {
    const { dat_hrainiusr, dat_hrafimusr, dat_datnscusr, ...rest } = dto;
    const data = {
      ...rest,
      dat_hrainiusr: parseTimeField(dat_hrainiusr),
      dat_hrafimusr: parseTimeField(dat_hrafimusr),
      dat_datnscusr: parseDateField(dat_datnscusr),
    };
    return this.prisma.tb_adm_usuario.create({ data, select: selectFields });
  }

  async update(id: number, dto: UpdateUsuarioDto) {
    await this.findOne(id);
    const { dat_hrainiusr, dat_hrafimusr, dat_datnscusr, ...rest } = dto;
    const data: Record<string, unknown> = { ...rest };
    if (dat_hrainiusr !== undefined) data.dat_hrainiusr = parseTimeField(dat_hrainiusr);
    if (dat_hrafimusr !== undefined) data.dat_hrafimusr = parseTimeField(dat_hrafimusr);
    if (dat_datnscusr !== undefined) data.dat_datnscusr = parseDateField(dat_datnscusr);
    return this.prisma.tb_adm_usuario.update({
      where: { int_codusr: id },
      data,
      select: selectFields,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.tb_adm_usuario.delete({ where: { int_codusr: id } });
  }

  // ── Vínculo Usuário x Empresa ─────────────────────────────────────────────

  async findEmpresas(usuarioId: number) {
    const vinculos = await this.prisma.tb_adm_usuario_empresa.findMany({
      where: { int_codusr: usuarioId },
      select: { tb_adm_empresa: { select: selectEmpresa } },
    });
    return vinculos.map(v => v.tb_adm_empresa);
  }

  async findEmpresasDisponiveis(usuarioId: number) {
    const vinculadas = await this.prisma.tb_adm_usuario_empresa.findMany({
      where: { int_codusr: usuarioId },
      select: { int_codemp: true },
    });
    const ids = vinculadas.map(v => v.int_codemp);
    return this.prisma.tb_adm_empresa.findMany({
      where: { int_codemp: { notIn: ids.length ? ids : [-1] } },
      select: selectEmpresa,
      orderBy: { vch_nomemp: 'asc' },
    });
  }

  async vincularEmpresas(usuarioId: number, empresaIds: number[]) {
    await this.findOne(usuarioId);
    await this.prisma.tb_adm_usuario_empresa.createMany({
      data: empresaIds.map(int_codemp => ({ int_codusr: usuarioId, int_codemp })),
      skipDuplicates: true,
    });
    return { vinculadas: empresaIds.length };
  }

  async desvincularEmpresas(usuarioId: number, empresaIds: number[]) {
    await this.prisma.tb_adm_usuario_empresa.deleteMany({
      where: { int_codusr: usuarioId, int_codemp: { in: empresaIds } },
    });
    return { desvinculadas: empresaIds.length };
  }

  // ── Vínculo Usuário x Grupo ───────────────────────────────────────────────

  async findGrupos(usuarioId: number) {
    const vinculos = await this.prisma.tb_adm_usuario_grupo.findMany({
      where: { int_codusr: usuarioId },
      select: { tb_adm_grupo_usuario: { select: selectGrupo } },
    });
    return vinculos.map(v => v.tb_adm_grupo_usuario);
  }

  async findGruposDisponiveis(usuarioId: number) {
    const vinculados = await this.prisma.tb_adm_usuario_grupo.findMany({
      where: { int_codusr: usuarioId },
      select: { int_codgrpusr: true },
    });
    const ids = vinculados.map(v => v.int_codgrpusr);
    return this.prisma.tb_adm_grupo_usuario.findMany({
      where: { int_codgrpusr: { notIn: ids.length ? ids : [-1] } },
      select: selectGrupo,
      orderBy: { vch_desgrpusr: 'asc' },
    });
  }

  async vincularGrupos(usuarioId: number, grupoIds: number[]) {
    await this.findOne(usuarioId);
    await this.prisma.tb_adm_usuario_grupo.createMany({
      data: grupoIds.map(int_codgrpusr => ({ int_codusr: usuarioId, int_codgrpusr })),
      skipDuplicates: true,
    });
    return { vinculados: grupoIds.length };
  }

  async desvincularGrupos(usuarioId: number, grupoIds: number[]) {
    await this.prisma.tb_adm_usuario_grupo.deleteMany({
      where: { int_codusr: usuarioId, int_codgrpusr: { in: grupoIds } },
    });
    return { desvinculados: grupoIds.length };
  }
}
