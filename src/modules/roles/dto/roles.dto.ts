import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsNumber()
  @IsOptional()
  sort: number;
}
