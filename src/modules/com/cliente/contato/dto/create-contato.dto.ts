import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateContatoDto {
  @IsNumber() @Min(1)
  bin_codcli: number;

  @IsString() @IsNotEmpty() @MaxLength(40)
  vch_nomctocli: string;

  @IsOptional() @IsString() @MaxLength(18)  vch_cgccpfcli?: string;
  @IsOptional() @IsString()                 vch_idtctocli?: string;
  @IsOptional() @IsString() @MaxLength(2)   chr_estctocli?: string;
  @IsOptional() @IsString() @MaxLength(40)  vch_cidctocli?: string;
  @IsOptional() @IsString() @MaxLength(30)  vch_baictocli?: string;
  @IsOptional() @IsString() @MaxLength(8)   vch_cepctocli?: string;
  @IsOptional() @IsString() @MaxLength(60)  vch_endctocli?: string;
  @IsOptional() @IsNumber()                 int_numendctocli?: number;
  @IsOptional() @IsString() @MaxLength(10)  vch_cplendctocli?: string;
  @IsOptional() @IsString() @MaxLength(12)  vch_numtelctocli?: string;
  @IsOptional() @IsString() @MaxLength(12)  vch_numcelctocli?: string;
  @IsOptional() @IsString() @MaxLength(100) vch_crectocli?: string;
  @IsOptional() @IsString()                 dat_datnscctocli?: string;
  @IsOptional() @IsString()                 vch_obsctocli?: string;
}
