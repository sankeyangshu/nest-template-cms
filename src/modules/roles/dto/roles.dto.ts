import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RolesDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty({ message: '角色名称不能为空' })
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsOptional()
  roleType: number;

  @IsNumber()
  @IsOptional()
  status: number;

  @IsNumber()
  @IsOptional()
  sort: number;
}
