import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateEspecialidadeDto } from './dto/create-especialidade.dto';
import { UpdateEspecialidadeDto } from './dto/update-especialidade.dto';

@Injectable()
export class EspecialidadeService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.tb_adm_especialidade.findMany({
      select: { int_codram: true, vch_desram: true },
      orderBy: { vch_desram: 'asc' },
    });
  }

  async findOne(id: number) {
    const esp = await this.prisma.tb_adm_especialidade.findUnique({
      where: { int_codram: id },
    });
    if (!esp) throw new NotFoundException(`Especialidade #${id} não encontrada`);
    return esp;
  }

  create(dto: CreateEspecialidadeDto) {
    return this.prisma.tb_adm_especialidade.create({ data: dto });
  }

  async update(id: number, dto: UpdateEspecialidadeDto) {
    await this.findOne(id);
    return this.prisma.tb_adm_especialidade.update({
      where: { int_codram: id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.tb_adm_especialidade.delete({ where: { int_codram: id } });
  }
}
