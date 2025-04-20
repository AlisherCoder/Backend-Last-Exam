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
import { TelegrambotService } from 'src/telegrambot/telegrambot.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private telegramBot: TelegrambotService,
  ) {}

  async create(createOrderDto: CreateOrderDto, req: Request) {
    const user = req['user'];
    const { order_items, location, ...body } = createOrderDto;

    try {
      for (let item of order_items) {
        if (item.tool_id) {
          const tool: any = await this.prisma.tool.findUnique({
            where: { id: item.tool_id },
          });

          if (tool.count < item.count)
            throw new BadRequestException('Tool quantity is not enough');
        }
      }

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
        include: {
          OrderItems: {
            include: { Level: true, Profession: true, Tool: true },
          },
          User: true,
        },
      });

      for (let item of order_items) {
        if (item.tool_id) {
          await this.prisma.tool.update({
            where: { id: item.tool_id },
            data: { count: { decrement: item.count } },
          });
        }
      }

      await this.prisma.backetItems.deleteMany({ where: { user_id: user.id } });

      this.telegramBot.sendMessage(data);

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

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
      filter.date = {
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
        include: {
          _count: true,
          OrderItems: {
            include: { Level: true, Profession: true, Tool: true },
          },
        },
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
          User: { omit: { password: true } },
          OrderItems: {
            include: { Profession: true, Level: true, Tool: true },
          },
          Comment: {
            include: {
              user: { omit: { password: true } },
              MasterRatings: { include: { Master: true } },
            },
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

      if (masters?.length) {
        const countMasters = await this.prisma.master.count({
          where: { id: { in: masters } },
        });

        if (countMasters !== masters.length) {
          throw new BadRequestException('Some master id does not exists');
        }
      }

      const updated = await this.prisma.order.update({
        where: { id },
        data: {
          status,
          Masters: { connect: masters?.map((master) => ({ id: master })) },
        },
        include: { OrderItems: true },
      });

      if (data.status == 'ACTIVE' && status == 'FINISHED') {
        for (let oi of updated.OrderItems) {
          if (oi.tool_id) {
            let res = await this.prisma.tool.update({
              where: { id: oi.tool_id },
              data: {
                count: { increment: oi.count },
              },
            });
            console.log(res);
          }
        }
      }

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

  // @Cron(CronExpression.EVERY_5_MINUTES)
  // async checkOrders(query: QueryOrderDto) {
  //   try {
  //     const rrr = await this.prisma.order.updateMany({
  //       where: {
  //         status: 'ACTIVE',
  //         date: {
  //           lt: new Date(),
  //         },
  //       },

  //       data: {
  //         status: 'FINISHED',
  //       },
  //     });
  //     console.log(rrr);

  //     // const orders = await this.prisma.order.findMany({
  //     //   where: {
  //     //     status: 'FINISHED',
  //     //   },
  //     //   include: { OrderItems: true },
  //     // });

  //     // let OrderItems = orders.map((order) => order.OrderItems).flat();

  //     // let result = OrderItems.map((oi) =>
  //     //   oi.tool_id
  //     //     ? {
  //     //         id: oi.tool_id,
  //     //         count: oi.count,
  //     //       }
  //     //     : null,
  //     // ).filter(Boolean);

  //     // let response = await Promise.all(
  //     //   result.map((tool) =>
  //     //     this.prisma.tool.update({
  //     //       where: { id: tool?.id },
  //     //       data: {
  //     //         count: {
  //     //           increment: tool?.count,
  //     //         },
  //     //       },
  //     //     }),
  //     //   ),
  //     // );

  //     // console.log(response);

  //     // return result

  //     // tgbot
  //   } catch (error) {
  //     throw new BadRequestException(error.message);
  //   }
  // }
}
