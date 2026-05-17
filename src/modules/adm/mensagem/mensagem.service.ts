import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMensagemDto } from './dto/create-mensagem.dto';
import { FilterMensagemDto } from './dto/filter-mensagem.dto';

@Injectable()
export class MensagemService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filter: FilterMensagemDto) {
    const where: Record<string, unknown> = {};

    if (filter.int_codusrdst) where.int_codusrdst = filter.int_codusrdst;
    if (filter.int_codusrrem) where.int_codusrrem = filter.int_codusrrem;
    if (filter.chr_flgmsgler) where.chr_flgmsgler = filter.chr_flgmsgler;

    if (filter.dat_datmsg_ini || filter.dat_datmsg_fim) {
      where.dat_datmsg = {
        ...(filter.dat_datmsg_ini ? { gte: new Date(filter.dat_datmsg_ini) } : {}),
        ...(filter.dat_datmsg_fim ? { lte: new Date(filter.dat_datmsg_fim + 'T23:59:59') } : {}),
      };
    }

    return this.prisma.tb_adm_mensagem.findMany({
      where,
      orderBy: { dat_datmsg: 'desc' },
      select: {
        bin_codmsg: true,
        int_codusrdst: true,
        int_codusrrem: true,
        vch_titmsg: true,
        vch_desmsg: true,
        dat_datmsg: true,
        dat_datmsgler: true,
        chr_flgmsgler: true,
        tb_adm_usuario_tb_adm_mensagem_int_codusrdstTotb_adm_usuario: {
          select: { int_codusr: true, vch_nomusr: true },
        },
        tb_adm_usuario_tb_adm_mensagem_int_codusrremTotb_adm_usuario: {
          select: { int_codusr: true, vch_nomusr: true },
        },
      },
    });
  }

  async create(dto: CreateMensagemDto, remetente: number) {
    const destinatarios = dto.destinatarios?.length
      ? dto.destinatarios
      : [dto.int_codusrdst];

    const sends = destinatarios.map(dst =>
      this.prisma.tb_adm_mensagem.create({
        data: {
          int_codusrdst: dst,
          int_codusrrem: remetente,
          vch_titmsg: dto.vch_titmsg,
          vch_desmsg: dto.vch_desmsg,
          dat_datmsg: new Date(),
        },
      }),
    );

    return this.prisma.$transaction(sends);
  }

  async markLida(id: bigint, lida: '0' | '1') {
    const msg = await this.prisma.tb_adm_mensagem.findUnique({ where: { bin_codmsg: id } });
    if (!msg) throw new NotFoundException(`Mensagem #${id} não encontrada`);
    return this.prisma.tb_adm_mensagem.update({
      where: { bin_codmsg: id },
      data: {
        chr_flgmsgler: lida,
        dat_datmsgler: lida === '1' ? new Date() : null,
      },
    });
  }

  async remove(id: bigint) {
    const msg = await this.prisma.tb_adm_mensagem.findUnique({ where: { bin_codmsg: id } });
    if (!msg) throw new NotFoundException(`Mensagem #${id} não encontrada`);
    return this.prisma.tb_adm_mensagem.delete({ where: { bin_codmsg: id } });
  }
}
