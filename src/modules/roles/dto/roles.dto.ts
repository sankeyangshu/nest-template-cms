import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RolesDto {
  @ApiProperty({ description: '角色id', required: false })
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty({ description: '角色名称', required: true })
  @IsString()
  @IsNotEmpty({ message: '角色名称不能为空' })
  roleName: string;

  @ApiProperty({ description: '角色描述' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: '角色类型', default: 1 })
  @IsNumber()
  @IsOptional()
  roleType: number;

  @ApiProperty({ description: '角色状态' })
  @IsBoolean()
  @IsOptional()
  status: boolean;

  @ApiProperty({ description: '排序' })
  @IsNumber()
  @IsOptional()
  sort: number;
}
