import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateGrupoUsuarioDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  vch_desgrpusr: string;

  @IsOptional()
  @IsString()
  @MaxLength(1)
  chr_flgicpbcodds?: string;
}
