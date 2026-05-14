import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { FilterClienteDto } from './dto/filter-cliente.dto';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  findAll(@Query() filter: FilterClienteDto) {
    return this.clienteService.findAll(filter);
  }

  @Get('status')
  findStatus() {
    return this.clienteService.findStatus();
  }

  @Get('tipos')
  findTipos() {
    return this.clienteService.findTipos();
  }

  @Get('motivos-status')
  findMotivosStatus() {
    return this.clienteService.findMotivosStatus();
  }

  @Get('regioes')
  findRegioes() {
    return this.clienteService.findRegioes();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(BigInt(id));
  }

  @Post()
  create(@Body() dto: CreateClienteDto) {
    return this.clienteService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateClienteDto) {
    return this.clienteService.update(BigInt(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clienteService.remove(BigInt(id));
  }
}
