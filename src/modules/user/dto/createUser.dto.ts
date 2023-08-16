import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
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

export class CreateUserDto {
  @ApiProperty({ description: '用户id', required: false })
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty({ description: '用户名', required: true })
  @IsString()
  @MinLength(4, { message: '用户名至少需要四位' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiProperty({ description: '密码', required: true })
  @IsString()
  @Length(4, 16, { message: '密码长度4-16位' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  @ApiProperty({ description: '昵称' })
  @IsString()
  @IsOptional()
  nickname: string;

  @ApiProperty({ description: '性别' })
  @IsIn([1, 2, 3], { message: '性别不合法' })
  @IsNumber()
  @IsOptional()
  sex: number;

  @ApiProperty({ description: '手机号' })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({ description: '邮箱' })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ description: '用户类型', default: 2 })
  @IsIn([0, 1, 2], { message: '用户类型不合法' })
  @IsNumber()
  @IsNotEmpty({ message: '用户类型不能为空' })
  userType: number;

  @ApiProperty({ description: '用户状态' })
  @IsBoolean()
  @IsOptional()
  status: boolean;

  @ApiProperty({ description: '用户描述' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: '用户角色', example: [1, 2, 3], type: [Number] })
  @IsArray()
  @ArrayNotEmpty({ message: '用户角色不能为空' })
  roleIds: number[];
}
