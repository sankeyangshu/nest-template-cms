import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resources } from '@/entities/resources.entity';
import { User } from '@/entities/user.entity';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';

@Module({
  imports: [TypeOrmModule.forFeature([Resources, User])],
  controllers: [ResourcesController],
  providers: [ResourcesService],
})
export class ResourcesModule {}
