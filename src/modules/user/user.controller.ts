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
