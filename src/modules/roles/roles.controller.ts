import { Controller, Post, Body, Patch, Delete, Query, ParseIntPipe, Req } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesDto } from './dto/roles.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { User } from '@/entities/user.entity';

@Controller('roles')
@ApiBearerAuth()
@ApiTags('角色模块')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('create')
  createRole(@Body() createRoleDto: RolesDto, @Req() req: Request) {
    const user = req['user'] as User;
    return this.rolesService.create(createRoleDto, user);
  }

  @Post('getAll')
  getRoles() {
    return this.rolesService.findAll();
  }

  @Patch('update')
  updateRole(@Body() updateRoleDto: RolesDto) {
    return this.rolesService.update(updateRoleDto);
  }

  @Delete('delete')
  @ApiQuery({ name: 'id', description: '要删除的角色的id', required: true, type: 'number' })
  @ApiOperation({ summary: '删除角色' })
  removeRole(@Query('id', ParseIntPipe) id: number) {
    return this.rolesService.remove(id);
  }
}
