import { Module } from '@nestjs/common';
import { EspecialidadeController } from './especialidade.controller';
import { EspecialidadeService }    from './especialidade.service';

@Module({
  controllers: [EspecialidadeController],
  providers:   [EspecialidadeService],
})
export class EspecialidadeModule {}
