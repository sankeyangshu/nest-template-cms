import { ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const noAuth = this.reflector.get<string>('no-auth', context.getHandler());
    // console.log("用户认证守卫")
    if (noAuth) {
      // 如果不需要认证直接跳过
      return true;
    } else {
      return super.canActivate(context);
    }
  }
}
