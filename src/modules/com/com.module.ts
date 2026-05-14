import { Module } from '@nestjs/common';
import { CidadeModule }   from './cidade/cidade.module';
import { AgendaModule }   from './agenda/agenda.module';
import { ClienteModule }  from './cliente/cliente.module';

@Module({
  imports: [CidadeModule, AgendaModule, ClienteModule],
})
export class ComModule {}
