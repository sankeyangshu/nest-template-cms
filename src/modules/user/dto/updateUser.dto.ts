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
  @IsNumber()
  @IsNotEmpty({ message: '用户id不能为空' })
  id: number;

  @IsString()
  @MinLength(4, { message: '用户名至少需要四位' })
  @IsOptional()
  username: string;

  @IsString()
  @Length(4, 16, { message: '密码长度4-16位' })
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  nickname: string;

  @IsIn([1, 2, 3], { message: '性别不合法' })
  @IsNumber()
  @IsOptional()
  sex: number;

  @IsString()
  @IsOptional()
  phone: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsIn([0, 1, 2], { message: '用户类型不合法' })
  @IsNumber()
  @IsOptional()
  userType: number;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsString()
  @IsOptional()
  description: string;
}
