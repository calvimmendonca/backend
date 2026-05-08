import { Controller, Get, Post, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UsuarioService }   from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Patch } from '@nestjs/common';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  findAll() { return this.usuarioService.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.usuarioService.findOne(id); }

  @Post()
  create(@Body() dto: CreateUsuarioDto) { return this.usuarioService.create(dto); }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUsuarioDto) {
    return this.usuarioService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { return this.usuarioService.remove(id); }

  // ── Vínculo Usuário x Empresa ─────────────────────────────────────────────

  @Get(':id/empresas')
  findEmpresas(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.findEmpresas(id);
  }

  @Get(':id/empresas-disponiveis')
  findEmpresasDisponiveis(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.findEmpresasDisponiveis(id);
  }

  @Post(':id/empresas')
  vincularEmpresas(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { empresas: number[] },
  ) {
    return this.usuarioService.vincularEmpresas(id, body.empresas);
  }

  @Delete(':id/empresas')
  desvincularEmpresas(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { empresas: number[] },
  ) {
    return this.usuarioService.desvincularEmpresas(id, body.empresas);
  }

  // ── Vínculo Usuário x Grupo ─────────────────────────────────────────────────────

  @Get(':id/grupos')
  findGrupos(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.findGrupos(id);
  }

  @Get(':id/grupos-disponiveis')
  findGruposDisponiveis(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.findGruposDisponiveis(id);
  }

  @Post(':id/grupos')
  vincularGrupos(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { grupos: number[] },
  ) {
    return this.usuarioService.vincularGrupos(id, body.grupos);
  }

  @Delete(':id/grupos')
  desvincularGrupos(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { grupos: number[] },
  ) {
    return this.usuarioService.desvincularGrupos(id, body.grupos);
  }
}
