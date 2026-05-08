import { Controller, Get } from '@nestjs/common';
import { StatusEmpresaService } from './status-empresa.service';

@Controller('empresas-status')
export class StatusEmpresaController {
  constructor(private readonly statusEmpresaService: StatusEmpresaService) {}

  @Get()
  findAll() {
    return this.statusEmpresaService.findAll();
  }
}
