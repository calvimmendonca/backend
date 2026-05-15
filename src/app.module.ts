import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/app.config';
import { PrismaModule } from './prisma/prisma.module';
import { AdmModule } from './modules/adm/adm.module';
import { ComModule } from './modules/com/com.module';
import { FinModule } from './modules/fin/fin.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    PrismaModule,
    AuthModule,
    AdmModule,
    ComModule,
    FinModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
