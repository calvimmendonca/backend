import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { FilterClienteDto } from './dto/filter-cliente.dto';

const clienteSelect = {
  bin_codcli: true,
  int_codstscli: true,
  int_codtipcli: true,
  vch_cgccpfcli: true,
  vch_doccli: true,
  vch_nomcli: true,
  vch_nomrdccli: true,
  chr_cepcli: true,
  vch_estcli: true,
  vch_cidcli: true,
  vch_baicli: true,
  vch_endcli: true,
  int_numendcli: true,
  vch_cplendcli: true,
  vch_telcli: true,
  vch_faxcli: true,
  vch_celcli: true,
  dat_nsccli: true,
  vch_crecli: true,
  vch_nomrefcomcli_1: true,
  vch_telrefcomcli_1: true,
  vch_nomrefcomcli_2: true,
  vch_telrefcomcli_2: true,
  vch_nomrefcomcli_3: true,
  vch_telrefcomcli_3: true,
  dec_vlrrndcli: true,
  dec_limcrdcli: true,
  chr_tippescli: true,
  vch_obscli: true,
  dat_datpfrvnccli: true,
  chr_sexcli: true,
  int_codreg: true,
  int_codcid: true,
  vch_endentcli: true,
  vch_endcobcli: true,
  chr_flgmtzfil: true,
  bin_codclimtz: true,
  vch_codmtccli: true,
  vch_numbco1: true,
  vch_numage1: true,
  vch_numcntcrr1: true,
  chr_digcntcrr1: true,
  vch_dtlcntcrr1: true,
  vch_numbco2: true,
  vch_numage2: true,
  vch_numcntcrr2: true,
  chr_digcntcrr2: true,
  vch_dtlcntcrr2: true,
  vch_numbco3: true,
  vch_numage3: true,
  vch_numcntcrr3: true,
  chr_digcntcrr3: true,
  vch_dtlcntcrr3: true,
  chr_flgterasncli: true,
  dat_datterasncli: true,
  vch_desitvcli: true,
  int_codemp: true,
  int_codmtvstscli: true,
  int_numdiapodcli: true,
  int_codusr: true,
  int_codusrpcp: true,
  dat_datcadcli: true,
  vch_orgemsidtcli: true,
  dat_datepdidtcli: true,
  bin_codptucli: true,
  vch_ceinsccli: true,
  dat_datemsceinsccli: true,
  chr_estceinsccli: true,
  vch_livceinsccli: true,
  vch_folceinsccli: true,
  bin_carnaccli: true,
  vch_nompaicli: true,
  vch_nommaecli: true,
  vch_insmnccli: true,
  chr_tiprecimpcli: true,
  int_codati: true,
  tb_com_status_cliente: { select: { vch_desstscli: true } },
  tb_com_tipo_cliente: { select: { vch_destipcli: true } },
  tb_com_cidade: { select: { vch_descid: true, chr_codest: true } },
  tb_com_regiao: { select: { vch_desreg: true } },
};

@Injectable()
export class ClienteService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(filter: FilterClienteDto = {}) {
    const { bin_codcli, vch_cgccpfcli, vch_nomcli, int_codstscli, int_codtipcli, int_codcid, vch_estcli, int_codreg } = filter;
    return this.prisma.tb_com_cliente.findMany({
      where: {
        ...(bin_codcli && { bin_codcli: BigInt(bin_codcli) }),
        ...(vch_cgccpfcli && { vch_cgccpfcli: { contains: vch_cgccpfcli } }),
        ...(vch_nomcli && { vch_nomcli: { contains: vch_nomcli, mode: 'insensitive' } }),
        ...(int_codstscli && { int_codstscli }),
        ...(int_codtipcli && { int_codtipcli }),
        ...(int_codcid && { int_codcid }),
        ...(vch_estcli && { vch_estcli }),
        ...(int_codreg && { int_codreg }),
      },
      select: clienteSelect,
      orderBy: { vch_nomcli: 'asc' },
      take: 200,
    });
  }

  async findOne(id: bigint) {
    const cliente = await this.prisma.tb_com_cliente.findUnique({
      where: { bin_codcli: id },
      select: clienteSelect,
    });
    if (!cliente) throw new NotFoundException(`Cliente #${id} não encontrado`);
    return cliente;
  }

  create(dto: CreateClienteDto) {
    return this.prisma.tb_com_cliente.create({
      data: {
        int_codstscli: dto.int_codstscli,
        int_codtipcli: dto.int_codtipcli,
        vch_cgccpfcli: dto.vch_cgccpfcli,
        vch_nomcli: dto.vch_nomcli,
        chr_tippescli: dto.chr_tippescli,
        vch_doccli: dto.vch_doccli,
        vch_nomrdccli: dto.vch_nomrdccli,
        chr_cepcli: dto.chr_cepcli,
        vch_estcli: dto.vch_estcli,
        vch_cidcli: dto.vch_cidcli,
        vch_baicli: dto.vch_baicli,
        vch_endcli: dto.vch_endcli,
        int_numendcli: dto.int_numendcli,
        vch_cplendcli: dto.vch_cplendcli,
        vch_telcli: dto.vch_telcli,
        vch_faxcli: dto.vch_faxcli,
        vch_celcli: dto.vch_celcli,
        dat_nsccli: dto.dat_nsccli ? new Date(dto.dat_nsccli) : null,
        vch_crecli: dto.vch_crecli,
        vch_nomrefcomcli_1: dto.vch_nomrefcomcli_1,
        vch_telrefcomcli_1: dto.vch_telrefcomcli_1,
        vch_nomrefcomcli_2: dto.vch_nomrefcomcli_2,
        vch_telrefcomcli_2: dto.vch_telrefcomcli_2,
        vch_nomrefcomcli_3: dto.vch_nomrefcomcli_3,
        vch_telrefcomcli_3: dto.vch_telrefcomcli_3,
        dec_vlrrndcli: dto.dec_vlrrndcli,
        dec_limcrdcli: dto.dec_limcrdcli,
        vch_obscli: dto.vch_obscli,
        dat_datpfrvnccli: dto.dat_datpfrvnccli ? new Date(dto.dat_datpfrvnccli) : null,
        chr_sexcli: dto.chr_sexcli,
        int_codreg: dto.int_codreg,
        int_codcid: dto.int_codcid ?? 0,
        vch_endentcli: dto.vch_endentcli,
        vch_endcobcli: dto.vch_endcobcli,
        chr_flgmtzfil: dto.chr_flgmtzfil ?? 'M',
        bin_codclimtz: dto.bin_codclimtz != null ? BigInt(dto.bin_codclimtz) : null,
        vch_codmtccli: dto.vch_codmtccli,
        vch_numbco1: dto.vch_numbco1,
        vch_numage1: dto.vch_numage1,
        vch_numcntcrr1: dto.vch_numcntcrr1,
        chr_digcntcrr1: dto.chr_digcntcrr1,
        vch_dtlcntcrr1: dto.vch_dtlcntcrr1,
        vch_numbco2: dto.vch_numbco2,
        vch_numage2: dto.vch_numage2,
        vch_numcntcrr2: dto.vch_numcntcrr2,
        chr_digcntcrr2: dto.chr_digcntcrr2,
        vch_dtlcntcrr2: dto.vch_dtlcntcrr2,
        vch_numbco3: dto.vch_numbco3,
        vch_numage3: dto.vch_numage3,
        vch_numcntcrr3: dto.vch_numcntcrr3,
        chr_digcntcrr3: dto.chr_digcntcrr3,
        vch_dtlcntcrr3: dto.vch_dtlcntcrr3,
        chr_flgterasncli: dto.chr_flgterasncli ?? 'N',
        dat_datterasncli: dto.dat_datterasncli ? new Date(dto.dat_datterasncli) : null,
        vch_desitvcli: dto.vch_desitvcli,
        int_codemp: dto.int_codemp,
        int_codmtvstscli: dto.int_codmtvstscli,
        int_numdiapodcli: dto.int_numdiapodcli,
        int_codusr: dto.int_codusr,
        int_codusrpcp: dto.int_codusrpcp,
        dat_datcadcli: new Date(),
        vch_orgemsidtcli: dto.vch_orgemsidtcli,
        dat_datepdidtcli: dto.dat_datepdidtcli ? new Date(dto.dat_datepdidtcli) : null,
        bin_codptucli: dto.bin_codptucli != null ? BigInt(dto.bin_codptucli) : null,
        vch_ceinsccli: dto.vch_ceinsccli,
        dat_datemsceinsccli: dto.dat_datemsceinsccli ? new Date(dto.dat_datemsceinsccli) : null,
        chr_estceinsccli: dto.chr_estceinsccli,
        vch_livceinsccli: dto.vch_livceinsccli,
        vch_folceinsccli: dto.vch_folceinsccli,
        bin_carnaccli: dto.bin_carnaccli != null ? BigInt(dto.bin_carnaccli) : null,
        vch_nompaicli: dto.vch_nompaicli,
        vch_nommaecli: dto.vch_nommaecli,
        vch_insmnccli: dto.vch_insmnccli,
        chr_tiprecimpcli: dto.chr_tiprecimpcli ?? 'A',
        int_codati: dto.int_codati ?? 1,
      },
      select: clienteSelect,
    });
  }

  async update(id: bigint, dto: UpdateClienteDto) {
    await this.findOne(id);
    return this.prisma.tb_com_cliente.update({
      where: { bin_codcli: id },
      data: {
        ...(dto.int_codstscli != null && { int_codstscli: dto.int_codstscli }),
        ...(dto.int_codtipcli != null && { int_codtipcli: dto.int_codtipcli }),
        ...(dto.vch_cgccpfcli != null && { vch_cgccpfcli: dto.vch_cgccpfcli }),
        ...(dto.vch_nomcli != null && { vch_nomcli: dto.vch_nomcli }),
        ...(dto.chr_tippescli != null && { chr_tippescli: dto.chr_tippescli }),
        ...(dto.vch_doccli !== undefined && { vch_doccli: dto.vch_doccli }),
        ...(dto.vch_nomrdccli !== undefined && { vch_nomrdccli: dto.vch_nomrdccli }),
        ...(dto.chr_cepcli !== undefined && { chr_cepcli: dto.chr_cepcli }),
        ...(dto.vch_estcli !== undefined && { vch_estcli: dto.vch_estcli }),
        ...(dto.vch_cidcli !== undefined && { vch_cidcli: dto.vch_cidcli }),
        ...(dto.vch_baicli !== undefined && { vch_baicli: dto.vch_baicli }),
        ...(dto.vch_endcli !== undefined && { vch_endcli: dto.vch_endcli }),
        ...(dto.int_numendcli !== undefined && { int_numendcli: dto.int_numendcli }),
        ...(dto.vch_cplendcli !== undefined && { vch_cplendcli: dto.vch_cplendcli }),
        ...(dto.vch_telcli !== undefined && { vch_telcli: dto.vch_telcli }),
        ...(dto.vch_faxcli !== undefined && { vch_faxcli: dto.vch_faxcli }),
        ...(dto.vch_celcli !== undefined && { vch_celcli: dto.vch_celcli }),
        ...(dto.dat_nsccli !== undefined && { dat_nsccli: dto.dat_nsccli ? new Date(dto.dat_nsccli) : null }),
        ...(dto.vch_crecli !== undefined && { vch_crecli: dto.vch_crecli }),
        ...(dto.vch_nomrefcomcli_1 !== undefined && { vch_nomrefcomcli_1: dto.vch_nomrefcomcli_1 }),
        ...(dto.vch_telrefcomcli_1 !== undefined && { vch_telrefcomcli_1: dto.vch_telrefcomcli_1 }),
        ...(dto.vch_nomrefcomcli_2 !== undefined && { vch_nomrefcomcli_2: dto.vch_nomrefcomcli_2 }),
        ...(dto.vch_telrefcomcli_2 !== undefined && { vch_telrefcomcli_2: dto.vch_telrefcomcli_2 }),
        ...(dto.vch_nomrefcomcli_3 !== undefined && { vch_nomrefcomcli_3: dto.vch_nomrefcomcli_3 }),
        ...(dto.vch_telrefcomcli_3 !== undefined && { vch_telrefcomcli_3: dto.vch_telrefcomcli_3 }),
        ...(dto.dec_vlrrndcli !== undefined && { dec_vlrrndcli: dto.dec_vlrrndcli }),
        ...(dto.dec_limcrdcli !== undefined && { dec_limcrdcli: dto.dec_limcrdcli }),
        ...(dto.vch_obscli !== undefined && { vch_obscli: dto.vch_obscli }),
        ...(dto.dat_datpfrvnccli !== undefined && { dat_datpfrvnccli: dto.dat_datpfrvnccli ? new Date(dto.dat_datpfrvnccli) : null }),
        ...(dto.chr_sexcli !== undefined && { chr_sexcli: dto.chr_sexcli }),
        ...(dto.int_codreg !== undefined && { int_codreg: dto.int_codreg }),
        ...(dto.int_codcid != null && { int_codcid: dto.int_codcid }),
        ...(dto.vch_endentcli !== undefined && { vch_endentcli: dto.vch_endentcli }),
        ...(dto.vch_endcobcli !== undefined && { vch_endcobcli: dto.vch_endcobcli }),
        ...(dto.chr_flgmtzfil !== undefined && { chr_flgmtzfil: dto.chr_flgmtzfil }),
        ...(dto.bin_codclimtz !== undefined && { bin_codclimtz: dto.bin_codclimtz != null ? BigInt(dto.bin_codclimtz) : null }),
        ...(dto.vch_codmtccli !== undefined && { vch_codmtccli: dto.vch_codmtccli }),
        ...(dto.vch_numbco1 !== undefined && { vch_numbco1: dto.vch_numbco1 }),
        ...(dto.vch_numage1 !== undefined && { vch_numage1: dto.vch_numage1 }),
        ...(dto.vch_numcntcrr1 !== undefined && { vch_numcntcrr1: dto.vch_numcntcrr1 }),
        ...(dto.chr_digcntcrr1 !== undefined && { chr_digcntcrr1: dto.chr_digcntcrr1 }),
        ...(dto.vch_dtlcntcrr1 !== undefined && { vch_dtlcntcrr1: dto.vch_dtlcntcrr1 }),
        ...(dto.vch_numbco2 !== undefined && { vch_numbco2: dto.vch_numbco2 }),
        ...(dto.vch_numage2 !== undefined && { vch_numage2: dto.vch_numage2 }),
        ...(dto.vch_numcntcrr2 !== undefined && { vch_numcntcrr2: dto.vch_numcntcrr2 }),
        ...(dto.chr_digcntcrr2 !== undefined && { chr_digcntcrr2: dto.chr_digcntcrr2 }),
        ...(dto.vch_dtlcntcrr2 !== undefined && { vch_dtlcntcrr2: dto.vch_dtlcntcrr2 }),
        ...(dto.vch_numbco3 !== undefined && { vch_numbco3: dto.vch_numbco3 }),
        ...(dto.vch_numage3 !== undefined && { vch_numage3: dto.vch_numage3 }),
        ...(dto.vch_numcntcrr3 !== undefined && { vch_numcntcrr3: dto.vch_numcntcrr3 }),
        ...(dto.chr_digcntcrr3 !== undefined && { chr_digcntcrr3: dto.chr_digcntcrr3 }),
        ...(dto.vch_dtlcntcrr3 !== undefined && { vch_dtlcntcrr3: dto.vch_dtlcntcrr3 }),
        ...(dto.chr_flgterasncli !== undefined && { chr_flgterasncli: dto.chr_flgterasncli }),
        ...(dto.dat_datterasncli !== undefined && { dat_datterasncli: dto.dat_datterasncli ? new Date(dto.dat_datterasncli) : null }),
        ...(dto.vch_desitvcli !== undefined && { vch_desitvcli: dto.vch_desitvcli }),
        ...(dto.int_codemp !== undefined && { int_codemp: dto.int_codemp }),
        ...(dto.int_codmtvstscli !== undefined && { int_codmtvstscli: dto.int_codmtvstscli }),
        ...(dto.int_numdiapodcli !== undefined && { int_numdiapodcli: dto.int_numdiapodcli }),
        ...(dto.int_codusr !== undefined && { int_codusr: dto.int_codusr }),
        ...(dto.int_codusrpcp !== undefined && { int_codusrpcp: dto.int_codusrpcp }),
        ...(dto.vch_orgemsidtcli !== undefined && { vch_orgemsidtcli: dto.vch_orgemsidtcli }),
        ...(dto.dat_datepdidtcli !== undefined && { dat_datepdidtcli: dto.dat_datepdidtcli ? new Date(dto.dat_datepdidtcli) : null }),
        ...(dto.bin_codptucli !== undefined && { bin_codptucli: dto.bin_codptucli != null ? BigInt(dto.bin_codptucli) : null }),
        ...(dto.vch_ceinsccli !== undefined && { vch_ceinsccli: dto.vch_ceinsccli }),
        ...(dto.dat_datemsceinsccli !== undefined && { dat_datemsceinsccli: dto.dat_datemsceinsccli ? new Date(dto.dat_datemsceinsccli) : null }),
        ...(dto.chr_estceinsccli !== undefined && { chr_estceinsccli: dto.chr_estceinsccli }),
        ...(dto.vch_livceinsccli !== undefined && { vch_livceinsccli: dto.vch_livceinsccli }),
        ...(dto.vch_folceinsccli !== undefined && { vch_folceinsccli: dto.vch_folceinsccli }),
        ...(dto.bin_carnaccli !== undefined && { bin_carnaccli: dto.bin_carnaccli != null ? BigInt(dto.bin_carnaccli) : null }),
        ...(dto.vch_nompaicli !== undefined && { vch_nompaicli: dto.vch_nompaicli }),
        ...(dto.vch_nommaecli !== undefined && { vch_nommaecli: dto.vch_nommaecli }),
        ...(dto.vch_insmnccli !== undefined && { vch_insmnccli: dto.vch_insmnccli }),
        ...(dto.chr_tiprecimpcli !== undefined && { chr_tiprecimpcli: dto.chr_tiprecimpcli }),
        ...(dto.int_codati !== undefined && { int_codati: dto.int_codati }),
      },
      select: clienteSelect,
    });
  }

  async remove(id: bigint) {
    await this.findOne(id);
    return this.prisma.tb_com_cliente.delete({ where: { bin_codcli: id } });
  }

  findStatus() {
    return this.prisma.tb_com_status_cliente.findMany({ orderBy: { int_codstscli: 'asc' } });
  }

  findTipos() {
    return this.prisma.tb_com_tipo_cliente.findMany({ orderBy: { int_codtipcli: 'asc' } });
  }

  findMotivosStatus() {
    return this.prisma.tb_com_motivo_status_cliente.findMany({ orderBy: { int_codmtvstscli: 'asc' } });
  }

  findRegioes() {
    return this.prisma.tb_com_regiao.findMany({ orderBy: { vch_desreg: 'asc' } });
  }
}
