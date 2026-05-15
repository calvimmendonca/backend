import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCargoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(35)
  vch_descgr: string;

  @IsOptional()
  @IsString()
  @MaxLength(1)
  chr_flgicpbcodds?: string;
}
