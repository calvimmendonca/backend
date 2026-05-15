import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const usuario = await this.prisma.tb_adm_usuario.findFirst({
      where: { vch_lgnusr: { equals: dto.login, mode: 'insensitive' } },
    });

    const hash = usuario?.vch_pswusr?.trim() ?? '';
    const valid = hash ? await bcrypt.compare(dto.senha.trim(), hash) : false;

    if (!usuario || !valid) {
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
