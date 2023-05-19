import { Body, Controller, Delete, ParseIntPipe, Patch, Post, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { GetUserDto } from './dto/getUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Request } from 'express';
import { User } from '@/entities/user.entity';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiBearerAuth()
@ApiTags('用户模块')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('getAll')
  @ApiOperation({ summary: '获取所有用户信息' })
  getUsers(@Body() query: GetUserDto) {
    return this.userService.findAll(query);
  }

  @Post('create')
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: '创建用户' })
  addUser(@Body() userDto: CreateUserDto, @Req() req: Request) {
    return this.userService.create(userDto, req['user'] as User);
  }

  @Patch('update')
  @ApiBody({ type: UpdateUserDto })
  @ApiOperation({ summary: '更新用户' })
  updateUser(@Body() userDto: UpdateUserDto, @Req() req: Request) {
    return this.userService.update(userDto, req['user'] as User);
  }

  @Delete('delete')
  @ApiQuery({ name: 'id', description: '要删除的用户的id', required: true, type: 'number' })
  @ApiOperation({ summary: '删除用户' })
  removeUser(@Query('id', ParseIntPipe) id: number, @Req() req: Request) {
    const userInfo = req['user'] as User;
    return this.userService.remove(id, userInfo);
  }
}
