/*
 * @Description: 项目入口文件
 * @Author: 三棵杨树
 * @Date: 2023-03-26 16:04:40
 * @LastEditors: 三棵杨树
 * @LastEditTime: 2023-03-27 21:21:48
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Config from 'config';

// 获取本地服务配置
const config = Config.get('server');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || config.port;
  await app.listen(port);
}

bootstrap();
