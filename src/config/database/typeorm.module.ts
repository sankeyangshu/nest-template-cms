/*
 * @Description: typeorm配置文件
 * @Author: 三棵杨树
 * @Date: 2023-04-01 15:03:37
 * @LastEditors: 三棵杨树
 * @LastEditTime: 2023-04-01 17:57:02
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from '@/utils';
import * as config from 'config';

// 获取数据库配置
const dbConfig = config.get('db');

// 获取实体类
const entities = [resolve('dist') + '/**/*.entity{.ts,.js}']; // 生产环境这里一定要注意是dist目录，否则会报连接异常

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: dbConfig.type, // 数据库类型
      host: dbConfig.host, // 主机
      port: dbConfig.port, // 端口号
      username: dbConfig.username, // 用户名
      password: dbConfig.password, // 密码
      database: dbConfig.database, // 数据库名称
      entities, // 实体类
      synchronize: dbConfig.synchronize, // 同步本地的schema与数据库-初始化数据库的时候使用，生产环境建议关闭
      logging: dbConfig.logging, // 是否打印日志,执行sql语句时候输出原生sql,也可以配置成一个数组["query", "error", "schema"]指定sql的执行类型
    }),
  ],
})
export class TypeormModule {}
