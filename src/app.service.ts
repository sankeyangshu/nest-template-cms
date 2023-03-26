/*
 * @Description: 项目根服务文件
 * @Author: 三棵杨树
 * @Date: 2023-03-26 16:04:40
 * @LastEditors: 三棵杨树
 * @LastEditTime: 2023-03-26 16:46:31
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
