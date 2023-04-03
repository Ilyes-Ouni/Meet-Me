import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { User } from 'src/shared/models/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private readonly jwtService: JwtService) {
    super();
  }

  async validate(token): Promise<any> {
    const decoded:any = this.jwtService.decode(token);
    const user = await this.authService.validateUser(decoded.id);

    if (!user) return null
    return user;
  }
}