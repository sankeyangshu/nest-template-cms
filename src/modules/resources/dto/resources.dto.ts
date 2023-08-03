import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ResourcesDto {
  @ApiProperty({ description: '资源id', required: false })
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty({ description: '资源名称', required: true })
  @IsString()
  title: string;

  @ApiProperty({ description: '资源唯一标记', required: true })
  @IsString()
  signName: string;

  @ApiProperty({ description: '资源地址', required: true })
  @IsNotEmpty({ message: '资源地址不能为空' })
  url: string;

  @ApiProperty({ description: '资源上级id' })
  @IsNumber()
  @IsOptional()
  pid: number;

  @ApiProperty({ description: '资源状态' })
  @IsBoolean()
  @IsOptional()
  status: boolean;

  @ApiProperty({ description: '排序' })
  @IsNumber()
  @IsOptional()
  sort: number;

  @ApiProperty({
    description: '资源类型：1是菜单(与前端关联),2是api接口(与后端关联)',
    required: true,
  })
  @IsIn([1, 2])
  authType: number;
}
