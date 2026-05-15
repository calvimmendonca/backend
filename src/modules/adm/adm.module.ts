import { Module } from '@nestjs/common';
import { CargoModule }          from './cargo/cargo.module';
import { EmpresaModule }        from './empresa/empresa.module';
import { AtividadeModule }      from './atividade/atividade.module';
import { EspecialidadeModule }  from './especialidade/especialidade.module';
import { GrupoUsuarioModule }   from './grupo-usuario/grupo-usuario.module';
import { UsuarioModule }        from './usuario/usuario.module';
import { MenuModule }           from './menu/menu.module';
import { GrupoMenuModule }      from './grupo-menu/grupo-menu.module';

@Module({
  imports: [CargoModule, EmpresaModule, AtividadeModule, EspecialidadeModule, GrupoUsuarioModule, UsuarioModule, MenuModule, GrupoMenuModule],
})
export class AdmModule {}
