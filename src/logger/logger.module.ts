/*
 * @Description: 日志模块
 * @Author: 三棵杨树
 * @Date: 2023-03-29 20:31:11
 * @LastEditors: 三棵杨树
 * @LastEditTime: 2023-03-29 20:33:15
 */
import { Global, Module } from '@nestjs/common';
import { AppLoggerService } from './logger.service';

@Global()
@Module({
  providers: [AppLoggerService],
  exports: [AppLoggerService],
})
export class LoggerModule {}
