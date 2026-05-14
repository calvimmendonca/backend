export class CreateAgendaDto {
  int_codemp!: number;
  int_codusr!: number;
  dat_datagdini!: Date | string;
  dat_datagdfin!: Date | string;
  int_codstsagd!: number;
  vch_destitagd!: string;
  bin_codcli?: bigint | number;
  vch_desobsagd?: string;
  vch_deslclagd?: string;
  int_codusrcadagd?: number;
}
