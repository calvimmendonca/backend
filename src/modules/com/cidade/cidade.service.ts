import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class CidadeService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.tb_com_cidade.findMany({
      select: { int_codcid: true, vch_descid: true, chr_codest: true },
      orderBy: [{ chr_codest: 'asc' }, { vch_descid: 'asc' }],
    });
  }
}
