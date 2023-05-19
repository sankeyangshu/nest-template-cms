import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthUserDto {
  @ApiProperty({ description: '用户名', required: true })
  @IsString()
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiProperty({ description: '密码', required: true })
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
