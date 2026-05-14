import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateContatoDto } from './dto/create-contato.dto';
import { UpdateContatoDto } from './dto/update-contato.dto';

const contatoSelect = {
  bin_codctocli: true,
  bin_codcli: true,
  vch_cgccpfcli: true,
  vch_idtctocli: true,
  vch_nomctocli: true,
  chr_estctocli: true,
  vch_cidctocli: true,
  vch_baictocli: true,
  vch_cepctocli: true,
  vch_endctocli: true,
  int_numendctocli: true,
  vch_cplendctocli: true,
  vch_numtelctocli: true,
  vch_numcelctocli: true,
  vch_crectocli: true,
  dat_datnscctocli: true,
  vch_obsctocli: true,
  dat_datcadctocli: true,
};

@Injectable()
export class ContatoService {
  constructor(private readonly prisma: PrismaService) {}

  findByCliente(clienteId: bigint) {
    return this.prisma.tb_com_cliente_contato.findMany({
      where: { bin_codcli: clienteId },
      select: contatoSelect,
      orderBy: { vch_nomctocli: 'asc' },
    });
  }

  async findOne(id: bigint) {
    const contato = await this.prisma.tb_com_cliente_contato.findUnique({
      where: { bin_codctocli: id },
      select: contatoSelect,
    });
    if (!contato) throw new NotFoundException(`Contato #${id} não encontrado`);
    return contato;
  }

  create(dto: CreateContatoDto) {
    return this.prisma.tb_com_cliente_contato.create({
      data: {
        bin_codcli: BigInt(dto.bin_codcli),
        vch_nomctocli: dto.vch_nomctocli,
        vch_cgccpfcli: dto.vch_cgccpfcli,
        vch_idtctocli: dto.vch_idtctocli,
        chr_estctocli: dto.chr_estctocli,
        vch_cidctocli: dto.vch_cidctocli,
        vch_baictocli: dto.vch_baictocli,
        vch_cepctocli: dto.vch_cepctocli,
        vch_endctocli: dto.vch_endctocli,
        int_numendctocli: dto.int_numendctocli,
        vch_cplendctocli: dto.vch_cplendctocli,
        vch_numtelctocli: dto.vch_numtelctocli,
        vch_numcelctocli: dto.vch_numcelctocli,
        vch_crectocli: dto.vch_crectocli,
        dat_datnscctocli: dto.dat_datnscctocli ? new Date(dto.dat_datnscctocli) : null,
        vch_obsctocli: dto.vch_obsctocli,
        dat_datcadctocli: new Date(),
      },
      select: contatoSelect,
    });
  }

  async update(id: bigint, dto: UpdateContatoDto) {
    await this.findOne(id);
    return this.prisma.tb_com_cliente_contato.update({
      where: { bin_codctocli: id },
      data: {
        ...(dto.vch_nomctocli != null && { vch_nomctocli: dto.vch_nomctocli }),
        ...(dto.vch_cgccpfcli !== undefined && { vch_cgccpfcli: dto.vch_cgccpfcli }),
        ...(dto.vch_idtctocli !== undefined && { vch_idtctocli: dto.vch_idtctocli }),
        ...(dto.chr_estctocli !== undefined && { chr_estctocli: dto.chr_estctocli }),
        ...(dto.vch_cidctocli !== undefined && { vch_cidctocli: dto.vch_cidctocli }),
        ...(dto.vch_baictocli !== undefined && { vch_baictocli: dto.vch_baictocli }),
        ...(dto.vch_cepctocli !== undefined && { vch_cepctocli: dto.vch_cepctocli }),
        ...(dto.vch_endctocli !== undefined && { vch_endctocli: dto.vch_endctocli }),
        ...(dto.int_numendctocli !== undefined && { int_numendctocli: dto.int_numendctocli }),
        ...(dto.vch_cplendctocli !== undefined && { vch_cplendctocli: dto.vch_cplendctocli }),
        ...(dto.vch_numtelctocli !== undefined && { vch_numtelctocli: dto.vch_numtelctocli }),
        ...(dto.vch_numcelctocli !== undefined && { vch_numcelctocli: dto.vch_numcelctocli }),
        ...(dto.vch_crectocli !== undefined && { vch_crectocli: dto.vch_crectocli }),
        ...(dto.dat_datnscctocli !== undefined && { dat_datnscctocli: dto.dat_datnscctocli ? new Date(dto.dat_datnscctocli) : null }),
        ...(dto.vch_obsctocli !== undefined && { vch_obsctocli: dto.vch_obsctocli }),
      },
      select: contatoSelect,
    });
  }

  async remove(id: bigint) {
    await this.findOne(id);
    return this.prisma.tb_com_cliente_contato.delete({ where: { bin_codctocli: id } });
  }
}
