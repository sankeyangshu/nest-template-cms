import { Module } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { ResourcesController } from './resources.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resources } from '@/entities/resources.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resources])],
  controllers: [ResourcesController],
  providers: [ResourcesService],
})
export class ResourcesModule {}
