import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NoAuth } from '@/decorators/noAuth.decorator';
import { AuthUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  @NoAuth('ALL')
  async signin(@Body() dto: AuthUserDto) {
    const userInfo = await this.authService.signin(dto);
    return userInfo;
  }

  @Post('/signup')
  signup(@Body() dto: AuthUserDto) {
    return this.authService.signup(dto);
  }
}
