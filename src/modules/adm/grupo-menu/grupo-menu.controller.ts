import { Controller, Get, Post, Delete, Patch, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { GrupoMenuService } from './grupo-menu.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@Controller('grupos-usuario/:grupoId/menus')
@UseGuards(JwtAuthGuard)
export class GrupoMenuController {
  constructor(private readonly grupoMenuService: GrupoMenuService) {}

  @Get()
  findVinculados(@Param('grupoId', ParseIntPipe) grupoId: number) {
    return this.grupoMenuService.findMenusVinculados(grupoId);
  }

  @Get('disponiveis')
  findDisponiveis(@Param('grupoId', ParseIntPipe) grupoId: number) {
    return this.grupoMenuService.findMenusDisponiveis(grupoId);
  }

  @Post()
  vincular(
    @Param('grupoId', ParseIntPipe) grupoId: number,
    @Body() body: { menus: { int_codmnu: number; chr_flgsel: string; chr_flgisr: string; chr_flgalt: string; chr_flgdel: string }[] },
  ) {
    return this.grupoMenuService.vincular(grupoId, body.menus);
  }

  @Delete()
  desvincular(
    @Param('grupoId', ParseIntPipe) grupoId: number,
    @Body() body: { menus: number[] },
  ) {
    return this.grupoMenuService.desvincular(grupoId, body.menus);
  }

  @Patch('permissoes')
  atualizarPermissoes(
    @Param('grupoId', ParseIntPipe) grupoId: number,
    @Body() body: { menus: { int_codmnu: number; chr_flgsel: string; chr_flgisr: string; chr_flgalt: string; chr_flgdel: string }[] },
  ) {
    return this.grupoMenuService.atualizarPermissoes(grupoId, body.menus);
  }
}
