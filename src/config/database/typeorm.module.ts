/*
 * @Description: typeorm配置文件
 * @Author: 三棵杨树
 * @Date: 2023-04-01 15:03:37
 * @LastEditors: 三棵杨树
 * @LastEditTime: 2023-04-01 15:16:40
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';

// 判断是否是开发环境
const isDev: boolean = process.env.NODE_ENV === 'development';

// 获取数据库配置
const dbConfig = config.get('db');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: dbConfig.type, // 数据库类型
      host: dbConfig.host, // 域名
      port: dbConfig.port, // 端口号
      username: dbConfig.username, // 用户名
      password: dbConfig.password, // 密码
      database: dbConfig.database, // 数据库名称
      entities: [], // 实体类
      synchronize: dbConfig.synchronize, // 同步本地的schema与数据库-初始化数据库的时候使用
    }),
  ],
})
export class TypeormModule {}
