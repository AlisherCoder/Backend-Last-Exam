import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { MasterService } from './master.service';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { Role, Roles } from 'src/guards/roles.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiQuery } from '@nestjs/swagger';
import { QueryMasterDto, SearchMasterDto, SearchSort, Sort } from './dto/query-master.dto';

@Controller('master')
export class MasterController {
  constructor(private readonly masterService: MasterService) {}

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  create(@Body() createMasterDto: CreateMasterDto) {
    return this.masterService.create(createMasterDto);
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.VIEWER_ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  @ApiQuery({ name: 'orderBy', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({ name: 'sortBy', required: false, enum: Sort })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'isActive', required: false, enum: ['true', 'false'] })
  @ApiQuery({ name: 'minYear', required: false, type: String })
  @ApiQuery({ name: 'maxYear', required: false, type: String })
  @ApiQuery({ name: 'year', required: false, type: String })
  @ApiQuery({ name: 'phone', required: false, type: String })
  @ApiQuery({ name: 'full_name', required: false, type: String })
  findAll(@Query() query: QueryMasterDto) {
    return this.masterService.findAll(query);
  }

  @Get('search')
  @ApiQuery({ name: 'orderBy', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({ name: 'sortBy', required: false, enum: SearchSort })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'lteExperience', required: false, type: Number })
  @ApiQuery({ name: 'gteExperience', required: false, type: Number })
  @ApiQuery({ name: 'experience', required: false, type: Number })
  @ApiQuery({ name: 'ltePrice_daily', required: false, type: Number })
  @ApiQuery({ name: 'gtePrice_daily', required: false, type: Number })
  @ApiQuery({ name: 'price_daily', required: false, type: Number })
  @ApiQuery({ name: 'ltePrice_hourly', required: false, type: Number })
  @ApiQuery({ name: 'gtePrice_hourly', required: false, type: Number })
  @ApiQuery({ name: 'price_hourly', required: false, type: Number })
  @ApiQuery({ name: 'lteMin_work_hours', required: false, type: Number })
  @ApiQuery({ name: 'gteMin_work_hours', required: false, type: Number })
  @ApiQuery({ name: 'min_work_hours', required: false, type: Number })
  @ApiQuery({ name: 'profession_id', required: false, type: String })
  @ApiQuery({ name: 'level_id', required: false, type: String })
  search(@Query() query: SearchMasterDto) {
    return this.masterService.search(query);
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.VIEWER_ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterService.findOne(id);
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMasterDto: UpdateMasterDto) {
    return this.masterService.update(id, updateMasterDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterService.remove(id);
  }
}
