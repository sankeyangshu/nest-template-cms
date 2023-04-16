/*
 * @Description: 用户模块
 * @Author: 三棵杨树
 * @Date: 2023-04-13 21:19:40
 * @LastEditors: 三棵杨树
 * @LastEditTime: 2023-04-13 21:22:11
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entities/user.entity';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
