import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class EspecialidadeService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.tb_adm_especialidade.findMany({
      select: { int_codram: true, vch_desram: true },
      orderBy: { vch_desram: 'asc' },
    });
  }
}
