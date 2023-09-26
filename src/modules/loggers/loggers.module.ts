import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logs } from '@/entities/logs.entity';
import { LoggersController } from './loggers.controller';
import { LoggersService } from './loggers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Logs])],
  controllers: [LoggersController],
  providers: [LoggersService],
})
export class LoggersModule {}
