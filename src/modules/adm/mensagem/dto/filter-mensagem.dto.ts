import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class FilterMensagemDto {
  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value) : undefined))
  int_codusrdst?: number;

  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value) : undefined))
  int_codusrrem?: number;

  @IsOptional()
  @IsString()
  chr_flgmsgler?: string;

  @IsOptional()
  @IsString()
  dat_datmsg_ini?: string;

  @IsOptional()
  @IsString()
  dat_datmsg_fim?: string;
}
