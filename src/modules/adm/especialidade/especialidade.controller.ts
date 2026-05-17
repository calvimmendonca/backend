import {
  Controller, Get, Post, Patch, Delete,
  Param, Body, ParseIntPipe,
} from '@nestjs/common';
import { EspecialidadeService } from './especialidade.service';
import { CreateEspecialidadeDto } from './dto/create-especialidade.dto';
import { UpdateEspecialidadeDto } from './dto/update-especialidade.dto';

@Controller('especialidades')
export class EspecialidadeController {
  constructor(private readonly especialidadeService: EspecialidadeService) {}

  @Get()
  findAll() { return this.especialidadeService.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.especialidadeService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateEspecialidadeDto) {
    return this.especialidadeService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEspecialidadeDto) {
    return this.especialidadeService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.especialidadeService.remove(id);
  }
}
