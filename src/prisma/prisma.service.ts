import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'], // logs no console (opcional)
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ Prisma conectado ao PostgreSQL');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('❌ Prisma desconectado');
  }
}
