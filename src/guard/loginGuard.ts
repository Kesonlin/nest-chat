import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
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
      // 抛出未授权的错误
      throw new UnauthorizedException();
      // return false;
    }

    const token = bearer[1];

    try {
      const info = this.jwtService.verify(token);
      //   console.log(info);
      (request as any).user = info.user;
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
