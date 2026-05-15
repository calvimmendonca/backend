import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateAtividadeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  vch_desati: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  vch_codcneati?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  dec_alqisscneati?: number;
}
