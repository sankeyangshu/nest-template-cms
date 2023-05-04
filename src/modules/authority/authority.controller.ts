import { Controller, Get, Post, Body, Patch, Delete, Query } from '@nestjs/common';
import { AuthorityService } from './authority.service';
import { AuthorityDto } from './dto/authority.dto';

@Controller('authority')
export class AuthorityController {
  constructor(private readonly authorityService: AuthorityService) {}

  @Post('create')
  create(@Body() createAuthorityDto: AuthorityDto) {
    return this.authorityService.create(createAuthorityDto);
  }

  @Get('getAll')
  findAll() {
    return this.authorityService.findAll();
  }

  @Get('get')
  findOne(@Query('id') id: number) {
    return this.authorityService.findOne(id);
  }

  @Patch('update')
  update(@Body() updateAuthorityDto: AuthorityDto) {
    return this.authorityService.update(updateAuthorityDto);
  }

  @Delete('delete')
  remove(@Query('id') id: number) {
    return this.authorityService.remove(id);
  }
}
