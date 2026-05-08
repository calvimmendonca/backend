import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class TipoUsuarioService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() {
    return this.prisma.tb_adm_tipo_usuario.findMany({
      select: { int_codtipusr: true, vch_destipusr: true },
      orderBy: { vch_destipusr: 'asc' },
    });
  }
}
