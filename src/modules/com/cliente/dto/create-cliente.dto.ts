import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateClienteDto {
  @IsNumber() @Min(1)
  int_codstscli: number;

  @IsNumber() @Min(1)
  int_codtipcli: number;

  @IsString() @IsNotEmpty() @MaxLength(18)
  vch_cgccpfcli: string;

  @IsString() @IsNotEmpty() @MaxLength(60)
  vch_nomcli: string;

  @IsString() @IsNotEmpty() @MaxLength(1)
  chr_tippescli: string;

  @IsOptional() @IsString() @MaxLength(20)  vch_doccli?: string;
  @IsOptional() @IsString() @MaxLength(35)  vch_nomrdccli?: string;
  @IsOptional() @IsString() @MaxLength(8)   chr_cepcli?: string;
  @IsOptional() @IsString() @MaxLength(2)   vch_estcli?: string;
  @IsOptional() @IsString() @MaxLength(40)  vch_cidcli?: string;
  @IsOptional() @IsString() @MaxLength(30)  vch_baicli?: string;
  @IsOptional() @IsString() @MaxLength(60)  vch_endcli?: string;
  @IsOptional() @IsNumber()                 int_numendcli?: number;
  @IsOptional() @IsString() @MaxLength(10)  vch_cplendcli?: string;
  @IsOptional() @IsString() @MaxLength(12)  vch_telcli?: string;
  @IsOptional() @IsString() @MaxLength(12)  vch_faxcli?: string;
  @IsOptional() @IsString() @MaxLength(12)  vch_celcli?: string;
  @IsOptional() @IsString()                 dat_nsccli?: string;
  @IsOptional() @IsString() @MaxLength(60)  vch_crecli?: string;

  @IsOptional() @IsString() @MaxLength(40)  vch_nomrefcomcli_1?: string;
  @IsOptional() @IsString() @MaxLength(12)  vch_telrefcomcli_1?: string;
  @IsOptional() @IsString() @MaxLength(40)  vch_nomrefcomcli_2?: string;
  @IsOptional() @IsString() @MaxLength(12)  vch_telrefcomcli_2?: string;
  @IsOptional() @IsString() @MaxLength(40)  vch_nomrefcomcli_3?: string;
  @IsOptional() @IsString() @MaxLength(12)  vch_telrefcomcli_3?: string;

  @IsOptional() @IsNumber() @Min(0)  dec_vlrrndcli?: number;
  @IsOptional() @IsNumber() @Min(0)  dec_limcrdcli?: number;
  @IsOptional() @IsString()          vch_obscli?: string;
  @IsOptional() @IsString()          dat_datpfrvnccli?: string;
  @IsOptional() @IsString() @MaxLength(1)  chr_sexcli?: string;
  @IsOptional() @IsNumber()          int_codreg?: number;
  @IsOptional() @IsNumber()          int_codcid?: number;
  @IsOptional() @IsString()          vch_endentcli?: string;
  @IsOptional() @IsString()          vch_endcobcli?: string;

  @IsOptional() @IsString() @MaxLength(1)  chr_flgmtzfil?: string;
  @IsOptional() @IsNumber()                bin_codclimtz?: number;
  @IsOptional() @IsString() @MaxLength(20) vch_codmtccli?: string;

  @IsOptional() @IsString() @MaxLength(5)   vch_numbco1?: string;
  @IsOptional() @IsString() @MaxLength(5)   vch_numage1?: string;
  @IsOptional() @IsString() @MaxLength(15)  vch_numcntcrr1?: string;
  @IsOptional() @IsString() @MaxLength(1)   chr_digcntcrr1?: string;
  @IsOptional() @IsString() @MaxLength(20)  vch_dtlcntcrr1?: string;
  @IsOptional() @IsString() @MaxLength(5)   vch_numbco2?: string;
  @IsOptional() @IsString() @MaxLength(5)   vch_numage2?: string;
  @IsOptional() @IsString() @MaxLength(15)  vch_numcntcrr2?: string;
  @IsOptional() @IsString() @MaxLength(1)   chr_digcntcrr2?: string;
  @IsOptional() @IsString() @MaxLength(20)  vch_dtlcntcrr2?: string;
  @IsOptional() @IsString() @MaxLength(5)   vch_numbco3?: string;
  @IsOptional() @IsString() @MaxLength(5)   vch_numage3?: string;
  @IsOptional() @IsString() @MaxLength(15)  vch_numcntcrr3?: string;
  @IsOptional() @IsString() @MaxLength(1)   chr_digcntcrr3?: string;
  @IsOptional() @IsString() @MaxLength(20)  vch_dtlcntcrr3?: string;

  @IsOptional() @IsString() @MaxLength(1)  chr_flgterasncli?: string;
  @IsOptional() @IsString()                dat_datterasncli?: string;
  @IsOptional() @IsString()                vch_desitvcli?: string;
  @IsOptional() @IsNumber()                int_codemp?: number;
  @IsOptional() @IsNumber()                int_codmtvstscli?: number;
  @IsOptional() @IsNumber()                int_numdiapodcli?: number;
  @IsOptional() @IsNumber()                int_codusr?: number;
  @IsOptional() @IsNumber()                int_codusrpcp?: number;
  @IsOptional() @IsString()                vch_orgemsidtcli?: string;
  @IsOptional() @IsString()                dat_datepdidtcli?: string;
  @IsOptional() @IsNumber()                bin_codptucli?: number;
  @IsOptional() @IsString()                vch_ceinsccli?: string;
  @IsOptional() @IsString()                dat_datemsceinsccli?: string;
  @IsOptional() @IsString() @MaxLength(2)  chr_estceinsccli?: string;
  @IsOptional() @IsString()                vch_livceinsccli?: string;
  @IsOptional() @IsString()                vch_folceinsccli?: string;
  @IsOptional() @IsNumber()                bin_carnaccli?: number;
  @IsOptional() @IsString() @MaxLength(40) vch_nompaicli?: string;
  @IsOptional() @IsString() @MaxLength(40) vch_nommaecli?: string;
  @IsOptional() @IsString() @MaxLength(20) vch_insmnccli?: string;
  @IsOptional() @IsString() @MaxLength(1)  chr_tiprecimpcli?: string;
  @IsOptional() @IsNumber()                int_codati?: number;
}
