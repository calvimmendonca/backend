import {
  Controller, Get, Post, Patch, Delete,
  Param, Body, Query, Request,
} from '@nestjs/common';
import { MensagemService } from './mensagem.service';
import { CreateMensagemDto } from './dto/create-mensagem.dto';
import { FilterMensagemDto } from './dto/filter-mensagem.dto';

@Controller('mensagens')
export class MensagemController {
  constructor(private readonly mensagemService: MensagemService) {}

  @Get()
  findAll(@Query() filter: FilterMensagemDto) {
    return this.mensagemService.findAll(filter);
  }

  @Post()
  create(@Body() dto: CreateMensagemDto, @Request() req: any) {
    const remetente: number = req.user?.sub ?? req.user?.id ?? 0;
    return this.mensagemService.create(dto, remetente);
  }

  @Patch(':id/lida')
  markLida(@Param('id') id: string, @Body('lida') lida: '0' | '1') {
    return this.mensagemService.markLida(BigInt(id), lida);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mensagemService.remove(BigInt(id));
  }
}
