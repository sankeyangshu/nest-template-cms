/*
 * @Description: 项目根模块文件
 * @Author: 三棵杨树
 * @Date: 2023-03-26 16:04:40
 * @LastEditors: 三棵杨树
 * @LastEditTime: 2023-03-29 21:09:00
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    LoggerModule, // 日志模块
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
