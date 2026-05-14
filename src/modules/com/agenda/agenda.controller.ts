import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { FilterAgendaDto } from './dto/filter-agenda.dto';

@Controller('agenda')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @Get()
  findAll(@Query() filter: FilterAgendaDto) {
    return this.agendaService.findAll(filter);
  }

  @Get('status')
  findStatus() {
    return this.agendaService.findStatus();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agendaService.findOne(BigInt(id));
  }

  @Post()
  create(@Body() dto: CreateAgendaDto) {
    return this.agendaService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAgendaDto) {
    return this.agendaService.update(BigInt(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agendaService.remove(BigInt(id));
  }
}
