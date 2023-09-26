import { Body, Controller, Delete, Get, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResourcesDto } from './dto/resources.dto';
import { ResourcesService } from './resources.service';

@Controller('resources')
@ApiBearerAuth()
@ApiTags('资源模块')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post('create')
  @ApiBody({ type: ResourcesDto })
  @ApiOperation({ summary: '创建资源' })
  create(@Body() createResourcesDto: ResourcesDto) {
    return this.resourcesService.create(createResourcesDto);
  }

  @Get('getAll')
  @ApiQuery({ name: 'title', description: '资源名称', type: 'string' })
  @ApiOperation({ summary: '获取所有资源信息' })
  findAll(@Query('title') title?: string) {
    return this.resourcesService.findAll(title);
  }

  @Get('getUserMenu')
  @ApiQuery({ name: 'userID', description: '要查询的用户id', required: true, type: 'number' })
  @ApiOperation({ summary: '获取用户资源信息' })
  findUserMenu(@Query('userID', ParseIntPipe) userID: number) {
    return this.resourcesService.findUserMenu(userID);
  }

  @Get('get')
  @ApiQuery({ name: 'id', description: '要查询的资源id', required: true, type: 'number' })
  @ApiOperation({ summary: '获取某个资源信息' })
  findOne(@Query('id') id: number) {
    return this.resourcesService.findOne(id);
  }

  @Patch('update')
  @ApiBody({ type: ResourcesDto })
  @ApiOperation({ summary: '更新资源信息' })
  update(@Body() updateResourcesDto: ResourcesDto) {
    return this.resourcesService.update(updateResourcesDto);
  }

  @Delete('delete')
  @ApiQuery({ name: 'id', description: '要删除的资源id', required: true, type: 'number' })
  @ApiQuery({ name: 'authType', description: '权限类型', required: true, type: 'number' })
  @ApiOperation({ summary: '删除资源' })
  remove(@Query('id', ParseIntPipe) id: number, @Query('authType', ParseIntPipe) authType: number) {
    return this.resourcesService.remove(id, authType);
  }
}
