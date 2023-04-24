import { Controller, Get, Post, Body, Patch, Delete, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesDto } from './dto/roles.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('create')
  create(@Body() createRoleDto: RolesDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get('getAll')
  findAll() {
    return this.rolesService.findAll();
  }

  @Get('get')
  findOne(@Query('id') id: number) {
    return this.rolesService.findOne(id);
  }

  @Patch('update')
  update(@Body() updateRoleDto: RolesDto) {
    return this.rolesService.update(updateRoleDto);
  }

  @Delete('delete')
  remove(@Query('id') id: number) {
    return this.rolesService.remove(id);
  }
}
