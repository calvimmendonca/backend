import { Module } from '@nestjs/common';
import { EmpresaController }       from './empresa.controller';
import { EmpresaService }          from './empresa.service';
import { StatusEmpresaController } from './status-empresa.controller';
import { StatusEmpresaService }    from './status-empresa.service';

@Module({
  controllers: [EmpresaController, StatusEmpresaController],
  providers:   [EmpresaService,    StatusEmpresaService],
})
export class EmpresaModule {}
