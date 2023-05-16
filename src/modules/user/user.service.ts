import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { GetUserDto } from './dto/getUser.dto';
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
    if (userLogin?.userType !== 0 && userLogin?.userType !== 1) {
      // 登录用户既不是超级管理员，又不是管理员，无法创建任何用户
      throw new UnauthorizedException('你没有权限创建该类型的用户');
    } else if (userLogin?.userType !== 0 && userLogin?.userType >= userDto.userType) {
      // 登录用户不是超级管理员，无法创建管理员权限的用户
      throw new UnauthorizedException('你没有权限创建该类型的用户');
    }

    // 判断要创建的用户账户是否存在
    const createUser = await this.find({ username: userDto.username });
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

  /**
   * @description: 查询用户列表
   * @param {GetUserDto} query 查询参数
   * @return 用户列表信息
   */
  findAll(query: GetUserDto) {
    // page - 页码，limit - 每页条数，condition-查询条件(username, role, sex)，sort-排序
    const { page, limit, username } = query;
    const take = limit || 10; // 条数
    const skip = ((page || 1) - 1) * take; // 页码 - 要跳过多少条
    return this.userRepository.find({
      take,
      skip,
      where: {
        username,
      },
    });
  }

  /**
   * @description: 获取用户信息
   * @param {string} username 用户名
   * @param {number} id 用户ID
   * @return 用户信息
   */
  find({ username, id }: { username?: string; id?: number }) {
    return this.userRepository.findOne({ where: { username, id } });
  }

  async update(id: number, user: Partial<User>) {
    return this.userRepository.update(id, user);
  }

  /**
   * @description: 删除用户
   * @param {number} id 要删除的用户id
   * @param {User} userLogin 登录用户信息
   * @return 删除结果
   */
  async remove(id: number, userLogin: User) {
    // 判断要删除的用户是否存在
    const user = await this.find({ id });
    if (!user) {
      // 用户不存在
      throw new ForbiddenException('用户不存在，无法删除');
    }
    // 判断用户是否有权限删除用户
    if (userLogin.userType !== 0 && userLogin.userType !== 1) {
      // 登录用户既不是超级管理员，又不是管理员，无法删除任何用户
      throw new UnauthorizedException('你没有权限删除该类型的用户');
    } else if (userLogin.userType !== 0 && userLogin.userType >= user.userType) {
      throw new UnauthorizedException('你没有权限删除该类型的用户');
    }
    return this.userRepository.delete(id);
  }
}
