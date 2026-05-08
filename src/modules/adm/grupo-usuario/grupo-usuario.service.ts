import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateGrupoUsuarioDto } from './dto/create-grupo-usuario.dto';
import { UpdateGrupoUsuarioDto } from './dto/update-grupo-usuario.dto';

@Injectable()
export class GrupoUsuarioService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.tb_adm_grupo_usuario.findMany({
      orderBy: { vch_desgrpusr: 'asc' },
    });
  }

  async findOne(id: number) {
    const grupo = await this.prisma.tb_adm_grupo_usuario.findUnique({
      where: { int_codgrpusr: id },
    });
    if (!grupo) throw new NotFoundException(`Grupo de Usuário #${id} não encontrado`);
    return grupo;
  }

  create(dto: CreateGrupoUsuarioDto) {
    return this.prisma.tb_adm_grupo_usuario.create({ data: dto });
  }

  async update(id: number, dto: UpdateGrupoUsuarioDto) {
    await this.findOne(id);
    return this.prisma.tb_adm_grupo_usuario.update({
      where: { int_codgrpusr: id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.tb_adm_grupo_usuario.delete({ where: { int_codgrpusr: id } });
  }
}
