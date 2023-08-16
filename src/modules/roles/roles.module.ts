import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from '@/entities/roles.entity';
import { User } from '@/entities/user.entity';
import { Resources } from '@/entities/resources.entity';
import { Permission } from '@/entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Roles, User, Resources, Permission])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
