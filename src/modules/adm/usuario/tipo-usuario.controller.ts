import { Controller, Get } from '@nestjs/common';
import { TipoUsuarioService } from './tipo-usuario.service';

@Controller('usuarios-tipo')
export class TipoUsuarioController {
  constructor(private readonly tipoUsuarioService: TipoUsuarioService) {}
  @Get()
  findAll() { return this.tipoUsuarioService.findAll(); }
}
