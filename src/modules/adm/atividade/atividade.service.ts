import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateAtividadeDto } from './dto/create-atividade.dto';
import { UpdateAtividadeDto } from './dto/update-atividade.dto';

@Injectable()
export class AtividadeService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.tb_adm_atividade.findMany({
      orderBy: { vch_desati: 'asc' },
    });
  }

  async findOne(id: number) {
    const atividade = await this.prisma.tb_adm_atividade.findUnique({
      where: { int_codati: id },
    });
    if (!atividade) throw new NotFoundException(`Atividade #${id} não encontrada`);
    return atividade;
  }

  create(dto: CreateAtividadeDto) {
    return this.prisma.tb_adm_atividade.create({ data: dto });
  }

  async update(id: number, dto: UpdateAtividadeDto) {
    await this.findOne(id);
    return this.prisma.tb_adm_atividade.update({
      where: { int_codati: id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.tb_adm_atividade.delete({ where: { int_codati: id } });
  }
}
