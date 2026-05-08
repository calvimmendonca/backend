import { Module } from '@nestjs/common';
import { CidadeModule } from './cidade/cidade.module';

@Module({
  imports: [CidadeModule],
})
export class ComModule {}
