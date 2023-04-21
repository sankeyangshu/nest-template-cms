import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async signin(username: string, password: string) {
    const res = await this.userService.find(username);

    if (res && res.password === password) {
      return this.jwtService.signAsync({
        username: res.username,
        sub: res.id,
      });
    }
    throw new UnauthorizedException();
  }

  signup(username: string, password: string) {
    return `signup ${username} ${password}`;
  }
}
