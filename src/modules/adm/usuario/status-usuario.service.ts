import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class StatusUsuarioService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() {
    return this.prisma.tb_adm_status_usuario.findMany({
      select: { int_codstausr: true, vch_desstausr: true },
      orderBy: { vch_desstausr: 'asc' },
    });
  }
}
