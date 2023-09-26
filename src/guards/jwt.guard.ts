import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_AUTH } from '@/decorators/noAuth.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const noAuth = this.reflector.get<string>(IS_AUTH, context.getHandler());
    // console.log("用户认证守卫")
    if (noAuth) {
      // 如果不需要认证直接跳过
      return true;
    }

    return super.canActivate(context);
  }

  // 在大多数情况下，使用一个提供的AuthGuard类是有用的。然而，在一些用例中你可能只是希望简单地扩展默认的错误处理或者认证逻辑。在这种情况下，你可以通过一个子类来扩展内置的类并且覆盖其方法。
  // 覆盖AuthGuard类中的错误处理方法， 定义自己的错误处理方法
  handleRequest(err: any, user: any, info: any) {
    // 可以抛出一个基于info或者err参数的异常
    if (err || !user) {
      throw err || new UnauthorizedException(info || '用户未授权');
    }
    return user;
  }
}
