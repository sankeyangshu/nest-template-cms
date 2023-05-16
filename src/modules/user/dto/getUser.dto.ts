import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUserDto {
  @IsNumber()
  @IsOptional()
  page: number;

  @IsNumber()
  @IsOptional()
  limit: number;

  @IsString()
  @IsOptional()
  username: string;

  @IsNumber()
  @IsOptional()
  sex: number;
}
