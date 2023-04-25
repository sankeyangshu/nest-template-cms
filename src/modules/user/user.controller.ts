import { Body, Controller, Delete, Get, ParseIntPipe, Post, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { Request } from 'express';
import { User } from '@/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('getAll')
  getUsers() {
    return this.userService.findAll();
  }

  @Post('create')
  addUser(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }

  @Delete('delete')
  removeUser(@Query('id', ParseIntPipe) id: number, @Req() req: Request) {
    // TODO 删除用户功能待完善
    const userInfo = req['user'] as User;
    console.log(' ~ file: user.controller.ts:24 ~ UserController ~ removeUser ~ userId:', userInfo);
    return this.userService.remove(id);
  }
}
