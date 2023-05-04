import { Module } from '@nestjs/common';
import { AuthorityService } from './authority.service';
import { AuthorityController } from './authority.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authority } from '@/entities/authority.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Authority])],
  controllers: [AuthorityController],
  providers: [AuthorityService],
})
export class AuthorityModule {}
