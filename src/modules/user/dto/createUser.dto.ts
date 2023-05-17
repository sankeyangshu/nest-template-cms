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

export class CreateUserDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @MinLength(4, { message: '用户名至少需要四位' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @IsString()
  @Length(4, 16, { message: '密码长度4-16位' })
  @IsNotEmpty({ message: '密码不能为空' })
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
  @IsNotEmpty({ message: '用户类型不能为空' })
  userType: number;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsString()
  @IsOptional()
  description: string;
}
