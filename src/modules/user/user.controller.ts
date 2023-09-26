import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { User } from '@/entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { GetUserDto } from './dto/getUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';

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

  @Get('getUserRoles')
  @ApiQuery({
    name: 'id',
    description: '要获取用户角色信息的用户id',
    required: true,
    type: 'number',
  })
  @ApiOperation({ summary: '获取用户角色信息' })
  getUserRoleList(@Query('id', ParseIntPipe) id: number) {
    return this.userService.getUserRoles(id);
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
