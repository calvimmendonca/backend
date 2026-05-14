import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { FilterAgendaDto } from './dto/filter-agenda.dto';

const agendaSelect = {
  bin_codagd: true,
  int_codemp: true,
  int_codusr: true,
  bin_codcli: true,
  dat_datagdini: true,
  dat_datagdfin: true,
  int_codstsagd: true,
  vch_destitagd: true,
  vch_desobsagd: true,
  vch_deslclagd: true,
  int_codusrcadagd: true,
  dat_datcadagd: true,
  tb_com_status_agenda: { select: { vch_desstsagd: true } },
  tb_adm_usuario_tb_com_agenda_int_codusrTotb_adm_usuario: {
    select: { vch_nomusr: true },
  },
  tb_com_cliente: { select: { vch_nomcli: true } },
};

@Injectable()
export class AgendaService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(filter: FilterAgendaDto = {}) {
    const {
      int_codemp,
      int_codusr,
      bin_codcli,
      int_codstsagd,
      dat_ini,
      dat_fim,
    } = filter;
    console.log('FILTROS', filter);

    return this.prisma.tb_com_agenda.findMany({
      where: {
        ...(int_codemp && { int_codemp }),
        ...(int_codusr && { int_codusr }),
        ...(bin_codcli && { bin_codcli: BigInt(bin_codcli) }),
        ...(int_codstsagd && { int_codstsagd }),
        ...(dat_ini || dat_fim
          ? {
              dat_datagdini: {
                ...(dat_ini && { gte: new Date(dat_ini) }),
                ...(dat_fim && { lte: new Date(dat_fim) }),
              },
            }
          : {}),
      },
      select: agendaSelect,
      orderBy: { dat_datagdini: 'asc' },
    });
  }

  async findOne(id: bigint) {
    const agenda = await this.prisma.tb_com_agenda.findUnique({
      where: { bin_codagd: id },
      select: agendaSelect,
    });
    if (!agenda) throw new NotFoundException(`Agenda #${id} não encontrada`);
    return agenda;
  }

  create(dto: CreateAgendaDto) {
    console.log('DTO Teste', dto);
    return this.prisma.tb_com_agenda.create({
      data: {
        int_codemp: dto.int_codemp,
        int_codusr: dto.int_codusr,
        dat_datagdini: new Date(dto.dat_datagdini),
        dat_datagdfin: new Date(dto.dat_datagdfin),
        int_codstsagd: dto.int_codstsagd,
        vch_destitagd: dto.vch_destitagd,
        bin_codcli: dto.bin_codcli != null ? BigInt(dto.bin_codcli) : null,
        vch_desobsagd: dto.vch_desobsagd,
        vch_deslclagd: dto.vch_deslclagd,
        int_codusrcadagd: dto.int_codusrcadagd,
        dat_datcadagd: new Date(),
      },
      select: agendaSelect,
    });
  }

  async update(id: bigint, dto: UpdateAgendaDto) {
    await this.findOne(id);
    return this.prisma.tb_com_agenda.update({
      where: { bin_codagd: id },
      data: {
        ...(dto.dat_datagdini && {
          dat_datagdini: new Date(dto.dat_datagdini),
        }),
        ...(dto.dat_datagdfin && {
          dat_datagdfin: new Date(dto.dat_datagdfin),
        }),
        ...(dto.int_codstsagd != null && { int_codstsagd: dto.int_codstsagd }),
        ...(dto.vch_destitagd != null && { vch_destitagd: dto.vch_destitagd }),
        ...(dto.vch_desobsagd != null && { vch_desobsagd: dto.vch_desobsagd }),
        ...(dto.vch_deslclagd != null && { vch_deslclagd: dto.vch_deslclagd }),
        ...(dto.bin_codcli !== undefined && {
          bin_codcli: dto.bin_codcli != null ? BigInt(dto.bin_codcli) : null,
        }),
      },
      select: agendaSelect,
    });
  }

  async remove(id: bigint) {
    await this.findOne(id);
    return this.prisma.tb_com_agenda.delete({ where: { bin_codagd: id } });
  }

  findStatus() {
    return this.prisma.tb_com_status_agenda.findMany({
      orderBy: { int_codstsagd: 'asc' },
    });
  }
}
