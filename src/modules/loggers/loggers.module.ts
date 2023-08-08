import { Module } from '@nestjs/common';
import { LoggersService } from './loggers.service';
import { LoggersController } from './loggers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logs } from '@/entities/logs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Logs])],
  controllers: [LoggersController],
  providers: [LoggersService],
})
export class LoggersModule {}
