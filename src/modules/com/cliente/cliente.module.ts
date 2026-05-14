import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { ContatoController } from './contato/contato.controller';
import { ContatoService } from './contato/contato.service';

@Module({
  controllers: [ClienteController, ContatoController],
  providers: [ClienteService, ContatoService],
})
export class ClienteModule {}
