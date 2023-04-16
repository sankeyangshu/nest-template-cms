/*
 * @Description: 用户模块服务层
 * @Author: 三棵杨树
 * @Date: 2023-04-13 21:20:24
 * @LastEditors: 三棵杨树
 * @LastEditTime: 2023-04-13 21:33:01
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  findAll() {
    return this.userRepository.find();
  }

  find(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async create(user: User) {
    const userTemp = await this.userRepository.create(user);
    return this.userRepository.save(userTemp);
  }

  async update(id: number, user: Partial<User>) {
    return this.userRepository.update(id, user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
