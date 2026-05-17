import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateEspecialidadeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  vch_desram: string;
}
