import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { GrupoUsuarioService }    from './grupo-usuario.service';
import { CreateGrupoUsuarioDto }  from './dto/create-grupo-usuario.dto';
import { UpdateGrupoUsuarioDto }  from './dto/update-grupo-usuario.dto';

@Controller('grupos-usuario')
export class GrupoUsuarioController {
  constructor(private readonly grupoUsuarioService: GrupoUsuarioService) {}

  @Get()
  findAll() {
    return this.grupoUsuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.grupoUsuarioService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateGrupoUsuarioDto) {
    return this.grupoUsuarioService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateGrupoUsuarioDto) {
    return this.grupoUsuarioService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.grupoUsuarioService.remove(id);
  }
}
