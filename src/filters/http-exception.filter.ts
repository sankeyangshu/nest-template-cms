/*
 * @Description: 全局http异常过滤器
 * @Author: 三棵杨树
 * @Date: 2023-04-19 21:01:45
 * @LastEditors: 三棵杨树
 * @LastEditTime: 2023-04-19 21:36:24
 */
import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppLoggerService } from '@/logger/logger.service';

// 全局异常过滤器处理
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly appLoggerService: AppLoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    this.appLoggerService.warn('进入全局异常过滤器', 'ExceptionResponse');

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>(); // 获取响应请求对象
    const request = ctx.getRequest<Request>(); // 获取请求对象
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR; // 异常状态码
    const errResBody =
      typeof exception.getResponse === 'function' ? exception.getResponse() : exception; // string|object ts无法知道object的成员
    const message =
      typeof errResBody === 'object'
        ? { message: (errResBody as any).message }
        : { message: errResBody } || { message: exception.message } || { message: '服务器异常' }; // 错误信息

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

    response.status(status).json(resBody);
  }
}
