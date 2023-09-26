import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetRolesListDto {
  @ApiProperty({ description: '角色id', required: false })
  @IsNumberString()
  @IsOptional()
  id: number;

  @ApiProperty({ description: '角色名称', required: false })
  @IsString()
  @IsOptional()
  roleName: string;

  @ApiProperty({ description: '角色状态', required: false })
  @IsBoolean()
  @IsOptional()
  status: boolean;

  @ApiProperty({ description: '分页-页码', default: 1, required: false })
  @IsNumber()
  @IsOptional()
  pageNum: number;

  @ApiProperty({ description: '分页-条数', default: 10, required: false })
  @IsNumber()
  @IsOptional()
  pageSize: number;

  @ApiProperty({ description: '是否不需要分页', required: false, default: false })
  @IsBoolean()
  @IsOptional()
  isNotPage: boolean;
}
