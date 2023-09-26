import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NoAuth } from '@/decorators/noAuth.decorator';
import { AuthUserDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('登录注册模块')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  @NoAuth('ALL')
  @ApiOperation({ summary: '用户登录' })
  async signin(@Body() dto: AuthUserDto) {
    const userInfo = await this.authService.signin(dto);
    return userInfo;
  }

  @Post('/signup')
  @NoAuth('ALL')
  @ApiOperation({ summary: '用户注册' })
  signup(@Body() dto: AuthUserDto) {
    return this.authService.signup(dto);
  }
}
