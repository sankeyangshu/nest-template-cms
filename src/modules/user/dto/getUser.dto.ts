import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUserDto {
  @ApiProperty({ description: '分页-页码', default: 1, required: false })
  @IsNumber()
  @IsOptional()
  pageNum: number;

  @ApiProperty({ description: '分页-条数', default: 10, required: false })
  @IsNumber()
  @IsOptional()
  pageSize: number;

  @ApiProperty({ description: '用户名', required: false })
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty({ description: '性别', default: 1, required: false })
  @IsNumber()
  @IsOptional()
  sex: number;
}
