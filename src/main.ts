/*
 * @Description: 项目入口文件
 * @Author: 三棵杨树
 * @Date: 2023-03-26 16:04:40
 * @LastEditors: 三棵杨树
 * @LastEditTime: 2023-04-19 21:39:12
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLoggerService } from './logger/logger.service';
import { setupSwagger } from './swagger';
import type { NestExpressApplication } from '@nestjs/platform-express';
import * as Config from 'config';
import { HttpExceptionFilter } from './filters/http-exception.filter';

// 获取本地服务配置
const config = Config.get('server');

async function bootstrap() {
  const logger = new AppLoggerService(); // 实例化日志对象

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: logger, // 替换默认的log日志
    cors: true, // 允许跨域
  });

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
