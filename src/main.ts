/*
 * @Description: 项目入口文件
 * @Author: 三棵杨树
 * @Date: 2023-03-26 16:04:40
 * @LastEditors: 三棵杨树
 * @LastEditTime: 2023-03-29 21:36:48
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLoggerService } from './logger/logger.service';
import * as Config from 'config';

// 获取本地服务配置
const config = Config.get('server');

async function bootstrap() {
  const logger = new AppLoggerService(); // 实例化日志对象

  const app = await NestFactory.create(AppModule, {
    logger: logger,
  });

  const port = process.env.PORT || config.port;

  await app.listen(port, () => {
    console.log('server run at');
    console.log(`   - Local: http://${config.origin}:${port}`);
  });
}

bootstrap();
