import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLoggerService } from './logger/logger.service';
import { setupSwagger } from './swagger';
import type { NestExpressApplication } from '@nestjs/platform-express';
import * as Config from 'config';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

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

  const port = process.env.PORT || config.port;

  await app.listen(port, () => {
    console.log('server run at');
    console.log(`   - Local: http://${config.origin}:${port}`);
  });
}

bootstrap();
