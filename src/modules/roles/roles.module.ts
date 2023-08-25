import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from '@/entities/roles.entity';
import { User } from '@/entities/user.entity';
import { Resources } from '@/entities/resources.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Roles, User, Resources])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
