import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { GetUserDto } from './dto/getUser.dto';
import { conditionUtils } from '@/utils/db.helper';
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
      throw new ForbiddenException('你没有权限创建该类型的用户');
    } else if (userLogin?.userType !== 0 && userLogin?.userType >= userDto.userType) {
      // 登录用户不是超级管理员，无法创建管理员权限的用户
      throw new ForbiddenException('你没有权限创建该类型的用户');
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
  async findAll(query: GetUserDto) {
    // page - 页码，limit - 每页条数，condition-查询条件(username, role, sex)，sort-排序
    const { pageNum = 1, pageSize = 10, username } = query;
    const take = pageSize; // 条数
    const skip = (pageNum - 1) * take; // 页码 - 要跳过多少条

    // 查询参数
    const obj = {
      'user.username': username,
    };

    const queryBuilder = this.userRepository.createQueryBuilder('user');
    const newQueryBuilder = conditionUtils<User>(queryBuilder, obj);

    // return this.userRepository.find({
    //   take,
    //   skip,
    //   where: {
    //     username,
    //   },
    // });

    const [list, total] = await newQueryBuilder.take(take).skip(skip).getManyAndCount();

    return {
      list,
      total,
      pageNum,
      pageSize,
    };
  }

  /**
   * @description: 获取用户信息
   * @param {string} option.username 用户名
   * @param {number} option.id 用户ID
   * @return 用户信息
   */
  find({ username, id }: { username?: string; id?: number }) {
    return this.userRepository.findOne({ where: { username, id } });
  }

  /**
   * @description: 更新用户信息
   * @param {User} updateUserDto 要更新的用户数据
   * @param {User} userLogin 登录用户数据
   * @return 更新结果
   */
  async update(updateUserDto: Partial<User>, userLogin: User) {
    // 获取要更新的用户id
    const id = updateUserDto.id;

    // 查询对应的用户信息
    const userTemp = await this.find({ id });
    if (!userTemp) {
      throw new ForbiddenException('用户不存在，无法更新');
    }

    // 判断用户是否有权限更新用户信息
    if (userLogin.userType !== 0 && userLogin.userType !== 1) {
      // 登录用户既不是超级管理员，又不是管理员，无法更新用户信息
      throw new ForbiddenException('你没有权限更新该用户的信息');
    } else if (userLogin.userType !== 0 && userLogin.userType >= userTemp.userType) {
      throw new ForbiddenException('你没有权限更新该用户的信息');
    }

    // 联合模型更新，需要使用save方法或者queryBuilder
    const newUserTemp = this.userRepository.merge(userTemp, updateUserDto);

    return this.userRepository.save(newUserTemp);
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
      throw new ForbiddenException('你没有权限删除该类型的用户');
    } else if (userLogin.userType !== 0 && userLogin.userType >= user.userType) {
      throw new ForbiddenException('你没有权限删除该类型的用户');
    }

    // 删除用户
    const { affected } = await this.userRepository.delete(id);

    // affected 删除的行数
    return affected > 0;
  }
}
