import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NoAuth } from '@/decorators/noAuth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  @NoAuth('ALL')
  async signin(@Body() dto: any) {
    const { username, password } = dto;
    const token = await this.authService.signin(username, password);
    return {
      token,
    };
  }

  @Post('/signup')
  signup(@Body() dto: any) {
    const { username, password } = dto;
    return this.authService.signup(username, password);
  }
}
