import { Controller, Get, Post, Body, Patch, Delete, Query } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { ResourcesDto } from './dto/resources.dto';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post('create')
  create(@Body() createResourcesDto: ResourcesDto) {
    return this.resourcesService.create(createResourcesDto);
  }

  @Get('getAll')
  findAll() {
    return this.resourcesService.findAll();
  }

  @Get('get')
  findOne(@Query('id') id: number) {
    return this.resourcesService.findOne(id);
  }

  @Patch('update')
  update(@Body() updateResourcesDto: ResourcesDto) {
    return this.resourcesService.update(updateResourcesDto);
  }

  @Delete('delete')
  remove(@Query('id') id: number) {
    return this.resourcesService.remove(id);
  }
}
