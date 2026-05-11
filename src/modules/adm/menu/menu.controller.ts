import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { MenuService } from './menu.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@Controller('menu')
@UseGuards(JwtAuthGuard)
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  getMenu(@Req() req: Request) {
    const userId: number = (req as any).user.sub;
    return this.menuService.getMenuForUser(userId);
  }
}
