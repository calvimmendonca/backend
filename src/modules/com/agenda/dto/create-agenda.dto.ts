import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateAgendaDto {
  @IsNumber() @Min(1)
  int_codemp: number;

  @IsNumber() @Min(1)
  int_codusr: number;

  @IsString() @IsNotEmpty()
  dat_datagdini: string;

  @IsString() @IsNotEmpty()
  dat_datagdfin: string;

  @IsNumber() @Min(1)
  int_codstsagd: number;

  @IsString() @IsNotEmpty()
  vch_destitagd: string;

  @IsOptional() @IsNumber()
  bin_codcli?: number;

  @IsOptional() @IsString()
  vch_desobsagd?: string;

  @IsOptional() @IsString()
  vch_deslclagd?: string;

  @IsOptional() @IsNumber()
  int_codusrcadagd?: number;
}
