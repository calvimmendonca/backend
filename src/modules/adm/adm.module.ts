import { Module } from '@nestjs/common';
import { CargoModule } from './cargo/cargo.module';

@Module({
  imports: [CargoModule],
})
export class AdmModule {}
