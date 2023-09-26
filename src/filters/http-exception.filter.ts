import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppLoggerService } from '@/logger/logger.service';

// 全局异常过滤器处理
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  // 注入日志服务相关依赖
  constructor(private readonly appLoggerService: AppLoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    this.appLoggerService.warn('进入全局异常过滤器', 'ExceptionResponse');

    const ctx = host.switchToHttp(); // 获取当前执行上下文
    const response = ctx.getResponse<Response>(); // 获取响应对象
    const request = ctx.getRequest<Request>(); // 获取请求对象
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR; // 异常状态码
    const errResBody =
      typeof exception.getResponse === 'function' ? exception.getResponse() : exception; // string|object ts无法知道object的成员
    const message =
      typeof errResBody === 'object'
        ? { message: (errResBody as any).message }
        : { message: errResBody || exception.message || '服务器异常' }; // 错误信息

    const resBody = {
      code: status, // 系统错误状态
      data: null, // 错误消息内容体(争取和拦截器中定义的响应体一样)
      ...message,
    };

    if (status === 404) {
      this.appLoggerService.warn(`${message.message} ${request.ip}`, 'ExceptionResponse');
    } else {
      this.appLoggerService.error(
        `${request.url},${request.method},${request.ip},${exception.stack}`,
        exception.stack,
        'ExceptionResponse'
      );
    }

    response.status(status >= 500 ? status : 200).json(resBody);
  }
}
