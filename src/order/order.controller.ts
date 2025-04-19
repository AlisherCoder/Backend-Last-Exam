import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Request } from 'express';
import { Role, Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiQuery } from '@nestjs/swagger';
import {
  PaymentType,
  QueryOrderDto,
  SortOrder,
  StatusOrder,
} from './dto/query-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req: Request) {
    return this.orderService.create(createOrderDto, req);
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.VIEWER_ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  @ApiQuery({ name: 'orderBy', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({ name: 'sortBy', required: false, enum: SortOrder })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, enum: StatusOrder })
  @ApiQuery({ name: 'payment_type', required: false, enum: PaymentType })
  @ApiQuery({ name: 'paid', required: false, enum: ['true', 'false'] })
  @ApiQuery({ name: 'with_delivery', required: false, enum: ['true', 'false'] })
  @ApiQuery({ name: 'lteTotal_sum', required: false, type: String })
  @ApiQuery({ name: 'gteTotal_sum', required: false, type: String })
  @ApiQuery({ name: 'total_sum', required: false, type: String })
  @ApiQuery({ name: 'lteDate', required: false, type: String })
  @ApiQuery({ name: 'gteDate', required: false, type: String })
  @ApiQuery({ name: 'date', required: false, type: String })
  findAll(@Query() query: QueryOrderDto) {
    return this.orderService.findAll(query);
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.VIEWER_ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
