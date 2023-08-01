import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: '用户id', required: true })
  @IsNumber()
  @IsNotEmpty({ message: '用户id不能为空' })
  id: number;

  @ApiProperty({ description: '用户名', required: false })
  @IsString()
  @MinLength(4, { message: '用户名至少需要四位' })
  @IsOptional()
  username: string;

  @ApiProperty({ description: '密码', required: false })
  @IsString()
  @Length(4, 16, { message: '密码长度4-16位' })
  @IsOptional()
  password: string;

  @ApiProperty({ description: '昵称', required: false })
  @IsString()
  @IsOptional()
  nickname: string;

  @ApiProperty({ description: '性别', required: false })
  @IsIn([1, 2, 3], { message: '性别不合法' })
  @IsNumber()
  @IsOptional()
  sex: number;

  @ApiProperty({ description: '手机号', required: false })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({ description: '邮箱', required: false })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ description: '用户类型', default: 2, required: false })
  @IsIn([0, 1, 2], { message: '用户类型不合法' })
  @IsNumber()
  @IsOptional()
  userType: number;

  @ApiProperty({ description: '用户状态', required: false })
  @IsBoolean()
  @IsOptional()
  status: boolean;

  @ApiProperty({ description: '用户描述', required: false })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: '用户角色' })
  @IsString()
  @IsOptional()
  roleIds: string;
}
