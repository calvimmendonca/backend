import { Type } from 'class-transformer';

export class FilterClienteDto {
  @Type(() => Number)
  bin_codcli?: number;

  vch_cgccpfcli?: string;
  vch_nomcli?: string;

  @Type(() => Number)
  int_codstscli?: number;

  @Type(() => Number)
  int_codtipcli?: number;

  @Type(() => Number)
  int_codcid?: number;

  vch_estcli?: string;

  @Type(() => Number)
  int_codreg?: number;
}
