import { Module } from '@nestjs/common';
import { UsuarioController }       from './usuario.controller';
import { UsuarioService }          from './usuario.service';
import { StatusUsuarioController } from './status-usuario.controller';
import { StatusUsuarioService }    from './status-usuario.service';
import { TipoUsuarioController }   from './tipo-usuario.controller';
import { TipoUsuarioService }      from './tipo-usuario.service';

@Module({
  controllers: [UsuarioController, StatusUsuarioController, TipoUsuarioController],
  providers:   [UsuarioService,    StatusUsuarioService,    TipoUsuarioService],
})
export class UsuarioModule {}
