/*
 * @Description: 项目根控制器文件
 * @Author: 三棵杨树
 * @Date: 2023-03-26 16:04:40
 * @LastEditors: 三棵杨树
 * @LastEditTime: 2023-03-26 16:47:08
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
