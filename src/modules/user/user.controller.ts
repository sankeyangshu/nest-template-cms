/*
 * @Description: 用户模块控制器
 * @Author: 三棵杨树
 * @Date: 2023-04-13 21:31:24
 * @LastEditors: 三棵杨树
 * @LastEditTime: 2023-04-13 21:35:42
 */
import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers(): any {
    return this.userService.findAll();
  }

  @Post()
  addUser(): any {
    const user = { username: 'admin', password: '123456' } as User;
    return this.userService.create(user);
  }
}
