import { Type } from 'class-transformer';

export class FilterAgendaDto {
  @Type(() => Number)
  int_codemp?: number;

  @Type(() => Number)
  int_codusr?: number;

  @Type(() => Number)
  bin_codcli?: number;

  @Type(() => Number)
  int_codstsagd?: number;

  dat_ini?: string;
  dat_fim?: string;
}
