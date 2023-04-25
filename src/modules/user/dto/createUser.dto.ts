import {
  IsEmail,
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

  @IsOptional()
  contact: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsNumber()
  @IsOptional()
  userType: number;

  @IsNumber()
  @IsOptional()
  status: number;
}
