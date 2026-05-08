import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { AtividadeService }    from './atividade.service';
import { CreateAtividadeDto }  from './dto/create-atividade.dto';
import { UpdateAtividadeDto }  from './dto/update-atividade.dto';

@Controller('atividades')
export class AtividadeController {
  constructor(private readonly atividadeService: AtividadeService) {}

  @Get()
  findAll() {
    return this.atividadeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.atividadeService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateAtividadeDto) {
    return this.atividadeService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAtividadeDto) {
    return this.atividadeService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.atividadeService.remove(id);
  }
}
