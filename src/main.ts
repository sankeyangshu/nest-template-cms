import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import * as Config from 'config';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { AppLoggerService } from './logger/logger.service';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

// 获取本地服务配置
const config = Config.get('server');

async function bootstrap() {
  const logger = new AppLoggerService(); // 实例化日志对象

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: logger, // 替换默认的log日志
    cors: true, // 允许跨域
  });

  // 设置所有 api 访问前缀
  app.setGlobalPrefix('/api');

  // 设置全局管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //如果设置为 true，验证程序将除去未使用任何装饰器的属性的已验证对象
    })
  );

  // 设置swagger文档
  if (Config.get('swagger').enable) {
    setupSwagger(app);
  }

  // 设置全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter(logger));

  // 设置全局拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());

  const port = process.env.PORT || config.port;

  await app.listen(port, () => {
    console.log('server run at');
    console.log(`   - Local: http://${config.origin}:${port}`);
  });
}

bootstrap();
