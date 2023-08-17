import { Module } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { ResourcesController } from './resources.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resources } from '@/entities/resources.entity';
import { User } from '@/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resources, User])],
  controllers: [ResourcesController],
  providers: [ResourcesService],
})
export class ResourcesModule {}
