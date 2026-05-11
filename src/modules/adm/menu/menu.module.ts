import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [MenuController],
  providers: [MenuService, JwtAuthGuard],
})
export class MenuModule {}
