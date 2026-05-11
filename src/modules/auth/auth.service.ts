import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const usuario = await this.prisma.tb_adm_usuario.findFirst({
      where: { vch_lgnusr: dto.login },
    });

    this.logger.debug(usuario);

    if (!usuario || usuario.vch_pswusr !== dto.senha) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = {
      sub:   usuario.int_codusr,
      login: usuario.vch_lgnusr,
      name:  usuario.vch_nomusr,
      email: usuario.vch_creusr ?? usuario.vch_lgnusr,
    };
    return { access_token: this.jwt.sign(payload) };
  }
}
