import { Controller, Get } from '@nestjs/common';
import { CidadeService } from './cidade.service';

@Controller('cidades')
export class CidadeController {
  constructor(private readonly cidadeService: CidadeService) {}

  @Get()
  findAll() {
    return this.cidadeService.findAll();
  }
}
