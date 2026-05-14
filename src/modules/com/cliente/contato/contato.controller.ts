import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ContatoService } from './contato.service';
import { CreateContatoDto } from './dto/create-contato.dto';
import { UpdateContatoDto } from './dto/update-contato.dto';

@Controller('clientes/:clienteId/contatos')
export class ContatoController {
  constructor(private readonly contatoService: ContatoService) {}

  @Get()
  findAll(@Param('clienteId') clienteId: string) {
    return this.contatoService.findByCliente(BigInt(clienteId));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contatoService.findOne(BigInt(id));
  }

  @Post()
  create(@Body() dto: CreateContatoDto) {
    return this.contatoService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateContatoDto) {
    return this.contatoService.update(BigInt(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contatoService.remove(BigInt(id));
  }
}
