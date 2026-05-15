import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateEmpresaDto {
  @IsString() @IsNotEmpty() @MaxLength(60)
  vch_nomemp: string;

  @IsString() @IsNotEmpty() @MaxLength(15)
  vch_cgcemp: string;

  @IsString() @IsNotEmpty() @MaxLength(20)
  vch_insestemp: string;

  @IsNumber() @Min(1)
  int_codstaemp: number;

  @IsNumber() @Min(1)
  int_codati: number;

  @IsNumber() @Min(0)
  int_codcid: number;

  @IsString() @IsNotEmpty() @MaxLength(1)
  chr_codmtzfilemp: string;

  @IsString() @IsNotEmpty() @MaxLength(1)
  chr_vldbcoemp: string;

  @IsOptional() @IsString() @MaxLength(35)
  vch_nomfntemp?: string;

  @IsOptional() @IsString() @MaxLength(8)
  chr_cepemp?: string;

  @IsOptional() @IsString() @MaxLength(2)
  chr_estemp?: string;

  @IsOptional() @IsString() @MaxLength(40)
  vch_cidemp?: string;

  @IsOptional() @IsString() @MaxLength(30)
  vch_baiemp?: string;

  @IsOptional() @IsString() @MaxLength(60)
  vch_endemp?: string;

  @IsOptional() @IsNumber()
  int_numendemp?: number;

  @IsOptional() @IsString() @MaxLength(10)
  vch_cplendemp?: string;

  @IsOptional() @IsString() @MaxLength(12)
  vch_tlfemp?: string;

  @IsOptional() @IsString() @MaxLength(12)
  vch_faxemp?: string;

  @IsOptional() @IsString() @MaxLength(50)
  vch_obsemp?: string;

  @IsOptional() @IsString() @MaxLength(40)
  vch_nomctoemp?: string;

  @IsOptional() @IsNumber()
  int_codempmtzemp?: number;

  // Tributação
  @IsOptional() @IsNumber() @Min(0) dec_alqissemp?: number;
  @IsOptional() @IsNumber() @Min(0) dec_alqpisemp?: number;
  @IsOptional() @IsNumber() @Min(0) dec_alqcrbfnmsegsocemp?: number;
  @IsOptional() @IsNumber() @Min(0) dec_alqimprndemp?: number;
  @IsOptional() @IsNumber() @Min(0) dec_alqcrbsocemp?: number;
  @IsOptional() @IsNumber() @Min(0) dec_alqinunacsegsocemp?: number;
  @IsOptional() @IsNumber() @Min(0) dec_alqsmpnacemp?: number;

  @IsOptional() @IsString() @MaxLength(20)
  vch_insmncemp?: string;

  @IsOptional() @IsString()
  int_codrgmtbtemp?: string;

  // Sintegra / NF
  @IsOptional() @IsString() @MaxLength(3)  chr_codopeemp?: string;
  @IsOptional() @IsString() @MaxLength(2)  chr_modnotfscemp?: string;
  @IsOptional() @IsString()                vch_sernotfscemp?: string;
  @IsOptional() @IsNumber()                tin_codidtettarqmgnemp?: number;
  @IsOptional() @IsNumber()                tin_codidtnatopeemp?: number;
  @IsOptional() @IsNumber()                tin_codfniaprarqmgnemp?: number;
}
