import { Module } from '@nestjs/common';
import { CargoModule }        from './cargo/cargo.module';
import { EmpresaModule }      from './empresa/empresa.module';
import { AtividadeModule }    from './atividade/atividade.module';
import { GrupoUsuarioModule } from './grupo-usuario/grupo-usuario.module';
import { UsuarioModule }      from './usuario/usuario.module';

@Module({
  imports: [CargoModule, EmpresaModule, AtividadeModule, GrupoUsuarioModule, UsuarioModule],
})
export class AdmModule {}
