import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resources } from '@/entities/resources.entity';
import { Roles } from '@/entities/roles.entity';
import { User } from '@/entities/user.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Roles, User, Resources])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
