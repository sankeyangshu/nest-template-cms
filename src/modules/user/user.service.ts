import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  /**
   * @description: 创建用户
   * @param {CreateUserDto} userDto 要创建用户信息
   * @param {User} userLogin 登录用户信息
   * @return 创建结果
   */
  async create(userDto: Partial<CreateUserDto>, userLogin?: User) {
    // 判断用户是否有权限创建新用户
    if (userLogin?.userType !== 1 && userDto.userType === 1) {
      // 登录用户不是管理员，无法创建管理员权限的用户
      throw new UnauthorizedException('你没有权限创建该类型的用户');
    }

    // 判断要创建的用户账户是否存在
    const createUser = await this.find(userDto.username);
    if (createUser) {
      // 用户账户存在
      throw new BadRequestException('用户已存在');
    }

    // 创建用户
    const userTemp = await this.userRepository.create(userDto);

    /**
     * 加密处理 - 异步方法
     * bcrypt.hash(data, salt)
     *    - data  要加密的数据
     *    - slat  用于哈希密码的盐。如果指定为数字，则将使用指定的轮数生成盐并将其使用。推荐 10
     */
    userTemp.password = await bcrypt.hash(userTemp.password, 10);
    const res = await this.userRepository.save(userTemp);
    return res;
  }

  findAll() {
    return this.userRepository.find();
  }

  /**
   * @description: 获取用户信息
   * @param {string} username 用户名
   * @return 用户信息
   */
  find(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async update(id: number, user: Partial<User>) {
    return this.userRepository.update(id, user);
  }

  /**
   * @description: 删除用户
   * @param {number} id 要删除的用户id
   * @return 删除结果
   */
  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
