import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AuthorityDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  title: string;

  @IsString()
  signName: string;

  @IsNotEmpty({ message: '资源地址不能为空' })
  url: string;

  @IsNumber()
  pid: number;

  @IsNumber()
  @IsOptional()
  status: number;

  @IsNumber()
  @IsOptional()
  sort: number;

  @IsIn([1, 2])
  authType: number;
}
