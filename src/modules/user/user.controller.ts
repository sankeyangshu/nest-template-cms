import { Body, Controller, Delete, Get, ParseIntPipe, Post, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { GetUserDto } from './dto/getUser.dto';
import { Request } from 'express';
import { User } from '@/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('getAll')
  getUsers(@Query() query: GetUserDto) {
    return this.userService.findAll(query);
  }

  @Post('create')
  addUser(@Body() userDto: CreateUserDto, @Req() req: Request) {
    return this.userService.create(userDto, req['user'] as User);
  }

  @Delete('delete')
  removeUser(@Query('id', ParseIntPipe) id: number, @Req() req: Request) {
    // TODO 删除用户功能待完善
    const userInfo = req['user'] as User;
    console.log(' ~ file: user.controller.ts:24 ~ UserController ~ removeUser ~ userId:', userInfo);
    return this.userService.remove(id);
  }
}
