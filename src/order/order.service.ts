import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { QueryOrderDto } from './dto/query-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto, req: Request) {
    const user = req['user'];
    const { order_items, location, ...body } = createOrderDto;

    try {
      const data = await this.prisma.order.create({
        data: {
          ...body,
          location: {
            ...location,
          },
          User: {
            connect: { id: user.id },
          },
          OrderItems: {
            create: order_items,
          },
        },
        include: { OrderItems: true },
      });

      await this.prisma.backetItems.deleteMany({ where: { user_id: user.id } });

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  // async create(createOrderDto: CreateOrderDto, req: Request) {
  //   const user = req['user'];
  //   const { order_items, location, ...body } = createOrderDto;

  //   try {
  //     const updates = []

  //     for(const item of order_items){
  //       if(item.profession_id){
  //         await this.prisma.profession.update({
  //           where: {id: item.profession_id},
  //           data: {
  //             cou
  //           }
  //         })
  //       }
  //     }

  //     const data = this.prisma.order.create({
  //       data: {
  //         ...body,
  //         location: {
  //           ...location,
  //         },
  //         User: {
  //           connect: { id: user.id },
  //         },
  //         OrderItems: {
  //           create: order_items,
  //         },
  //       },
  //       include: { OrderItems: true },
  //     });

  //     await this.prisma.backetItems.deleteMany({ where: { user_id: user.id } });

  //     return { data: "" };
  //   } catch (error) {
  //     if (error instanceof HttpException) {
  //       throw error;
  //     }
  //     throw new BadRequestException(error.message);
  //   }
  // }

  async findAll(query: QueryOrderDto) {
    const {
      page = 1,
      limit = 10,
      orderBy = 'asc',
      sortBy = 'dete',
      with_delivery,
      total_sum,
      gteTotal_sum,
      lteTotal_sum,
      date,
      gteDate,
      lteDate,
      paid,
      payment_type,
      status,
    } = query;

    const filter: any = {};

    if (with_delivery == 'true') filter.with_delivery = true;
    if (with_delivery == 'false') filter.with_delivery = false;

    if (paid == 'true') filter.paid = true;
    if (paid == 'false') filter.paid = false;

    if (payment_type) filter.payment_type = payment_type;
    if (status) filter.status = status;

    if (total_sum || gteTotal_sum || lteTotal_sum) {
      filter.total_sum = {
        gte: gteTotal_sum,
        lte: lteTotal_sum,
        equals: total_sum,
      };
    }

    if (date || gteDate || lteDate) {
      filter.dete = {
        gte: gteDate,
        lte: lteDate,
        equals: date,
      };
    }

    try {
      const data = await this.prisma.order.findMany({
        where: filter,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [sortBy]: orderBy,
        },
        include: { OrderItems: { include: { Level: true, Profession: true } } },
      });

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.prisma.order.findUnique({
        where: { id },
        include: {
          User: true,
          OrderItems: {
            include: { Profession: true, Level: true, Tool: true },
          },
        },
      });

      if (!data) {
        throw new NotFoundException('Order not found');
      }

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const { status, masters } = updateOrderDto;
    try {
      const data = await this.prisma.order.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Order not found');
      }

      const countMasters = await this.prisma.master.count({
        where: { id: { in: masters } },
      });

      if (countMasters !== masters.length) {
        throw new BadRequestException('Some master id does not exists');
      }

      const updated = await this.prisma.order.update({
        where: { id },
        data: {
          status,
          Masters: { connect: masters.map((master) => ({ id: master })) },
        },
      });

      return { data: updated };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const data = await this.prisma.order.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Order not found');
      }

      const deleted = await this.prisma.order.delete({
        where: { id },
      });

      return { data: deleted };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}
