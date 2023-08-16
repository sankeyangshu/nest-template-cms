import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PermissionDto {
  @ApiProperty({ description: '权限id', required: false })
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty({ description: '权限名称', required: true })
  @IsString()
  @IsNotEmpty({ message: '权限名称不能为空' })
  permName: string;

  @ApiProperty({ description: '权限描述' })
  @IsString()
  @IsOptional()
  description: string;
}
