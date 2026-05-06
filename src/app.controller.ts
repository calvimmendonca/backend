import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { tb_com_cliente } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('clientes')
  async listarClientes(): Promise<tb_com_cliente[]> {
    return this.prisma.tb_com_cliente.findMany();
  }
}
