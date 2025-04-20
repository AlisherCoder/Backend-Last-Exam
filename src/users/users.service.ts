import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryUserDto } from './dto/query-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: QueryUserDto) {
    const {
      page = 1,
      limit = 10,
      orderBy = 'asc',
      sortBy = 'full_name',
      full_name,
      phone,
      createdAt,
      region_id,
      role,
      status,
    } = query;

    let filter: any = {};

    if (full_name)
      filter.full_name = { mode: 'insensitive', contains: full_name };
    if (phone) filter.phone = { mode: 'insensitive', contains: phone };
    if (createdAt) filter.createdAt = createdAt;
    if (region_id) filter.region_id = region_id;
    if (role) filter.role = role;

    if (status == 'true') filter.status = true;
    if (status == 'false') filter.status = false;

    try {
      const users = await this.prisma.user.findMany({
        where: filter,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [sortBy]: orderBy,
        },
        include: { _count: true, Region: true },
        omit: { password: true },
      });

      return { data: users };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        omit: { password: true },
        include: {
          Company: true,
          Order: true,
          Region: true,
          Comment: true,
          BacketItems: {
            include: { Level: true, Profession: true, Tool: true },
          },
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return { data: user };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateAuthDto) {
    const { company, ...data } = updateUserDto;
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (data.region_id) {
        const region = await this.prisma.region.findUnique({
          where: { id: data.region_id },
        });

        if (!region) {
          throw new NotFoundException('Region not found');
        }
      }

      if (company) {
        await this.prisma.company.update({
          where: { user_id: user.id },
          data: company,
        });
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: data,
        include: { Company: true },
        omit: { password: true },
      });

      return { data: updatedUser };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const deletedUser = await this.prisma.user.delete({ where: { id } });

      return { data: deletedUser };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}
