import { Controller, Get } from '@nestjs/common';
import { StatusUsuarioService } from './status-usuario.service';

@Controller('usuarios-status')
export class StatusUsuarioController {
  constructor(private readonly statusUsuarioService: StatusUsuarioService) {}
  @Get()
  findAll() { return this.statusUsuarioService.findAll(); }
}
