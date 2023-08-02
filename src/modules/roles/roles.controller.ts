import { Controller, Post, Body, Patch, Delete, Query, ParseIntPipe, Req } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesDto } from './dto/roles.dto';
import { GetRolesListDto } from './dto/getRolesList.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { User } from '@/entities/user.entity';

@Controller('roles')
@ApiBearerAuth()
@ApiTags('角色模块')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('create')
  @ApiBody({ type: RolesDto })
  @ApiOperation({ summary: '创建角色' })
  createRole(@Body() createRoleDto: RolesDto, @Req() req: Request) {
    const user = req['user'] as User;
    return this.rolesService.create(createRoleDto, user);
  }

  @Post('getAll')
  @ApiOperation({ summary: '获取所有角色信息' })
  getRoles(@Query() query: GetRolesListDto) {
    // 判断是查询单个角色还是查询全部角色
    if (query.id) {
      return this.rolesService.findOne(query.id);
    }
    return this.rolesService.findAll(query);
  }

  @Patch('update')
  @ApiBody({ type: RolesDto })
  @ApiOperation({ summary: '更新角色信息' })
  updateRole(@Body() updateRoleDto: RolesDto) {
    return this.rolesService.update(updateRoleDto);
  }

  @Delete('delete')
  @ApiQuery({ name: 'id', description: '要删除的角色的id', required: true, type: 'number' })
  @ApiOperation({ summary: '删除角色' })
  removeRole(@Query('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user = req['user'] as User;
    return this.rolesService.remove(id, user);
  }
}
