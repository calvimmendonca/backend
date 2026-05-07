import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';

@Injectable()
export class CargoService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.tb_adm_cargo.findMany();
  }

  async findOne(id: number) {
    const cargo = await this.prisma.tb_adm_cargo.findUnique({
      where: { int_codcgr: id },
    });
    if (!cargo) throw new NotFoundException(`Cargo #${id} não encontrado`);
    return cargo;
  }

  create(dto: CreateCargoDto) {
    return this.prisma.tb_adm_cargo.create({ data: dto });
  }

  async update(id: number, dto: UpdateCargoDto) {
    await this.findOne(id);
    return this.prisma.tb_adm_cargo.update({
      where: { int_codcgr: id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.tb_adm_cargo.delete({ where: { int_codcgr: id } });
  }
}
