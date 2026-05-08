import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class StatusEmpresaService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.tb_adm_status_empresa.findMany({
      select: { int_codstaemp: true, vch_desstaemp: true },
      orderBy: { vch_desstaemp: 'asc' },
    });
  }
}
