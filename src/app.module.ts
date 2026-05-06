import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Carrega .env
    PrismaModule, // <-- Adicionado
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
