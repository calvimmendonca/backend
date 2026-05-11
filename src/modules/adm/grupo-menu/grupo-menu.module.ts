import { Module } from '@nestjs/common';
import { GrupoMenuController } from './grupo-menu.controller';
import { GrupoMenuService }    from './grupo-menu.service';
import { JwtAuthGuard }        from '../../../common/guards/jwt-auth.guard';
import { AuthModule }          from '../../auth/auth.module';

@Module({
  imports:     [AuthModule],
  controllers: [GrupoMenuController],
  providers:   [GrupoMenuService, JwtAuthGuard],
})
export class GrupoMenuModule {}
