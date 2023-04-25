import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  /**
   * @description: 用户登录
   * @param {AuthUserDto} dto 登录信息，包含用户名和密码
   * @return 登录结果
   */
  async signin(dto: AuthUserDto) {
    const { username, password } = dto;

    // 获取登录用户的信息
    const res = await this.userService.find(username);

    // 判断用户是否存在
    if (!res) {
      // 用户不存在
      throw new BadRequestException('用户不存在');
    }

    // TODO 判断用户密码是否正确
    if (res && res.password !== password) {
      throw new BadRequestException('密码错误');
    }

    // TODO 判断用户是否处于禁用状态

    // 生成token
    const userData = { ...res, password: '' };
    const token = await this.jwtService.signAsync({ ...userData });
    return {
      ...userData,
      token,
    };
  }

  /**
   * @description: 用户注册
   * @param {AuthUserDto} dto 注册信息，包含用户名和密码
   * @return 注册结果
   */
  async signup(dto: AuthUserDto) {
    const { username, password } = dto;
    const user = await this.userService.find(username);

    // 判断用户名是否已经存在
    if (user) {
      throw new ForbiddenException('用户已存在');
    }

    const res = this.userService.create({ username, password });
    return res;
  }
}
