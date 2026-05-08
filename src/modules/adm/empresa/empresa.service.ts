import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

const selectFields = {
  int_codemp:        true,
  int_codstaemp:     true,
  int_codati:        true,
  int_codcid:        true,
  vch_cgcemp:        true,
  vch_insestemp:     true,
  vch_nomemp:        true,
  vch_nomfntemp:     true,
  chr_codmtzfilemp:  true,
  chr_vldbcoemp:     true,
  int_codempmtzemp:  true,
  chr_cepemp:        true,
  chr_estemp:        true,
  vch_cidemp:        true,
  vch_baiemp:        true,
  vch_endemp:        true,
  int_numendemp:     true,
  vch_cplendemp:     true,
  vch_tlfemp:        true,
  vch_faxemp:        true,
  vch_obsemp:        true,
  vch_nomctoemp:     true,
  tb_adm_status_empresa: { select: { vch_desstaemp: true } },
  tb_adm_atividade:      { select: { vch_desati:    true } },
  tb_com_cidade:         { select: { vch_descid: true, chr_codest: true } },
} as const;

@Injectable()
export class EmpresaService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.tb_adm_empresa.findMany({
      select: selectFields,
      orderBy: { vch_nomemp: 'asc' },
    });
  }

  async findOne(id: number) {
    const empresa = await this.prisma.tb_adm_empresa.findUnique({
      where:  { int_codemp: id },
      select: selectFields,
    });
    if (!empresa) throw new NotFoundException(`Empresa #${id} não encontrada`);
    return empresa;
  }

  create(dto: CreateEmpresaDto) {
    return this.prisma.tb_adm_empresa.create({ data: dto, select: selectFields });
  }

  async update(id: number, dto: UpdateEmpresaDto) {
    await this.findOne(id);
    return this.prisma.tb_adm_empresa.update({
      where:  { int_codemp: id },
      data:   dto,
      select: selectFields,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.tb_adm_empresa.delete({ where: { int_codemp: id } });
  }
}
