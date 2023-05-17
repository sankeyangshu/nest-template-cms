import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUserDto {
  @IsNumber()
  @IsOptional()
  pageNum: number;

  @IsNumber()
  @IsOptional()
  pageSize: number;

  @IsString()
  @IsOptional()
  username: string;

  @IsNumber()
  @IsOptional()
  sex: number;
}
