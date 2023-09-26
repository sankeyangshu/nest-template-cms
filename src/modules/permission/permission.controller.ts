import { Body, Controller, Delete, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PermissionDto } from './dto/permission.dto';
import { PermissionService } from './permission.service';

@Controller('permission')
@ApiBearerAuth()
@ApiTags('权限模块')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post('create')
  @ApiBody({ type: PermissionDto })
  @ApiOperation({ summary: '创建权限' })
  create(@Body() createPermissionDto: PermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Get('getAll')
  @ApiOperation({ summary: '获取所有权限信息' })
  findAll() {
    return this.permissionService.findAll();
  }

  @Delete('delete')
  @ApiQuery({ name: 'id', description: '要删除的权限id', required: true, type: 'number' })
  @ApiOperation({ summary: '删除权限' })
  remove(@Query('id', ParseIntPipe) id: number) {
    return this.permissionService.remove(id);
  }
}
