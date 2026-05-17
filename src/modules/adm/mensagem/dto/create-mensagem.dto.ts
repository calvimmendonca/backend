import {
  IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, IsArray,
} from 'class-validator';

export class CreateMensagemDto {
  @IsInt()
  int_codusrdst: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  destinatarios?: number[];

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  vch_titmsg: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  vch_desmsg: string;
}
