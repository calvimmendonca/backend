import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/app.config';
import { PrismaModule } from './prisma/prisma.module';
import { AdmModule } from './modules/adm/adm.module';
import { ComModule } from './modules/com/com.module';
import { FinModule } from './modules/fin/fin.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    PrismaModule,
    AuthModule,
    AdmModule,
    ComModule,
    FinModule,
  ],
})
export class AppModule {}
