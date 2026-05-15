import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateUsuarioDto {
  @IsNumber() @Min(1)
  int_codstausr: number;

  @IsNumber() @Min(1)
  int_codemp: number;

  @IsString() @IsNotEmpty() @MaxLength(20)
  vch_lgnusr: string;

  @IsString() @IsNotEmpty() @MaxLength(60)
  vch_nomusr: string;

  @IsNumber() @Min(1)
  int_codcgr: number;

  @IsNumber() @Min(1)
  int_codtipusr: number;

  @IsOptional() @IsString() @MaxLength(72)
  vch_pswusr?: string;

  @IsOptional() @IsString() @MaxLength(20)
  vch_pswextusr?: string;

  @IsOptional() @IsNumber()
  tin_nivacsusr?: number;

  @IsOptional() @IsString() @MaxLength(1)
  chr_flgsupvndusr?: string;

  // Identificação
  @IsOptional() @IsString() @MaxLength(14)
  vch_cgccpfusr?: string;

  @IsOptional() @IsString() @MaxLength(20)
  vch_idtusr?: string;

  @IsOptional() @IsString() @MaxLength(20)
  vch_numcshregmdcusr?: string;

  @IsOptional() @IsNumber()
  int_codram?: number;

  @IsOptional() @IsString()
  dat_datnscusr?: string;

  // Contato
  @IsOptional() @IsString() @MaxLength(20)
  vch_numtelusr?: string;

  @IsOptional() @IsString() @MaxLength(20)
  vch_numcelusr?: string;

  @IsOptional() @IsString() @MaxLength(50)
  vch_creusr?: string;

  // Endereço
  @IsOptional() @IsString() @MaxLength(10)
  vch_cepusr?: string;

  @IsOptional() @IsString() @MaxLength(60)
  vch_endusr?: string;

  @IsOptional() @IsNumber()
  int_numendusr?: number;

  @IsOptional() @IsString() @MaxLength(35)
  vch_baiusr?: string;

  @IsOptional() @IsString() @MaxLength(35)
  vch_cidusr?: string;

  @IsOptional() @IsString() @MaxLength(2)
  chr_estusr?: string;

  @IsOptional() @IsString() @MaxLength(300)
  vch_obsusr?: string;

  // Acesso
  @IsOptional() @IsString()
  dat_hrainiusr?: string;

  @IsOptional() @IsString()
  dat_hrafimusr?: string;

  // Vínculos
  @IsOptional() @IsNumber()
  bin_codcli?: number;

  @IsOptional() @IsNumber()
  int_codfrn?: number;

  @IsOptional() @IsNumber()
  int_codrep?: number;

  // Vendas
  @IsOptional() @IsNumber()
  dec_pcndscmax?: number;

  @IsOptional() @IsNumber()
  int_codusrsup?: number;
}
