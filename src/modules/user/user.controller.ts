import { Body, Controller, Delete, ParseIntPipe, Post, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { GetUserDto } from './dto/getUser.dto';
import { Request } from 'express';
import { User } from '@/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('getAll')
  getUsers(@Body() query: GetUserDto) {
    return this.userService.findAll(query);
  }

  @Post('create')
  addUser(@Body() userDto: CreateUserDto, @Req() req: Request) {
    return this.userService.create(userDto, req['user'] as User);
  }

  @Delete('delete')
  removeUser(@Query('id', ParseIntPipe) id: number, @Req() req: Request) {
    const userInfo = req['user'] as User;
    return this.userService.remove(id, userInfo);
  }
}
