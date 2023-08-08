import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLoggerDto {
  @ApiProperty({ description: '日志id', required: false })
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty({ description: '请求路径', required: true })
  @IsString()
  @IsNotEmpty({ message: '请求路径不能为空' })
  path: string;

  @ApiProperty({ description: '请求方法', required: true })
  @IsString()
  @IsNotEmpty({ message: '请求方法不能为空' })
  method: string;

  @ApiProperty({ description: '请求数据', required: true })
  @IsString()
  @IsNotEmpty({ message: '请求数据不能为空' })
  data: string;

  @ApiProperty({ description: '请求结果', required: false })
  @IsNumber()
  @IsOptional()
  result: string;

  @ApiProperty({ description: '用户id' })
  @IsNumber()
  @IsOptional()
  userId: number;
}
