import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable, map } from 'rxjs';

/**
 * 响应体
 */
interface ResBody<T> {
  data: T;
}

// 全局响应拦截器
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResBody<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>
  ): Observable<ResBody<T>> | Promise<Observable<ResBody<T>>> {
    // const ctx = context.switchToHttp();
    // const req = ctx.getRequest<Request>();
    // console.log('这里在全局响应拦截器执行之前', req);
    return next.handle().pipe(
      map((data: T) => {
        // console.log('这里在拦截器执行之后', data);
        return {
          code: 0,
          data: data,
          message: 'success',
        };
      })
    );
  }
}
