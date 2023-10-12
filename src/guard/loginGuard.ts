import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService;

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();

    const authorization = request.header('authorization') || '';
    const bearer = authorization.split(' ');

    if (!bearer || bearer.length < 2) {
      console.log('eeee');

      return false;
    }

    const token = bearer[1];

    try {
      const info = this.jwtService.verify(token);

      return true;
    } catch (e) {
      console.log(e);

      return false;
    }
    return false;
  }
}
