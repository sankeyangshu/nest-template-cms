import { Body, Controller, Delete, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateLoggerDto } from './dto/createLogger.dto';
import { LoggersService } from './loggers.service';

@Controller('loggers')
@ApiBearerAuth()
@ApiTags('日志模块')
export class LoggersController {
  constructor(private readonly loggersService: LoggersService) {}

  @Post('create')
  @ApiBody({ type: CreateLoggerDto })
  @ApiOperation({ summary: '创建日志' })
  createLogger(@Body() createLoggerDto: CreateLoggerDto) {
    return this.loggersService.create(createLoggerDto);
  }

  @Get('getAll')
  @ApiOperation({ summary: '获取所有日志' })
  findAll(
    @Query('pageNum', ParseIntPipe) pageNum: number,
    @Query('pageSize', ParseIntPipe) pageSize: number
  ) {
    return this.loggersService.findAll(pageNum, pageSize);
  }

  @Delete('delete')
  @ApiQuery({ name: 'id', description: '要删除的日志的id', required: true, type: 'number' })
  @ApiOperation({ summary: '删除日志' })
  removeLogger(@Query('id', ParseIntPipe) id: number) {
    return this.loggersService.remove(id);
  }
}
