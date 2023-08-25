import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ResourcesDto {
  @ApiProperty({ description: '资源id', required: false })
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty({ description: '资源名称', required: true })
  @IsString()
  @IsNotEmpty({ message: '资源名称不能为空' })
  title: string;

  @ApiProperty({ description: '资源唯一标记', required: true })
  @IsString()
  @IsNotEmpty({ message: '资源唯一标记不能为空' })
  signName: string;

  @ApiProperty({ description: '资源地址', required: true })
  @IsString()
  @IsOptional()
  url: string;

  @ApiProperty({ description: '图标' })
  @IsString()
  @IsOptional()
  icon: string;

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
  @IsIn([1, 2, 3])
  @IsNotEmpty({ message: '资源类型不能为空' })
  authType: number;
}
