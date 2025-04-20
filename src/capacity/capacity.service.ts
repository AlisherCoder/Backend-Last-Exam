import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCapacityDto } from './dto/create-capacity.dto';
import { UpdateCapacityDto } from './dto/update-capacity.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryCapacityDto } from './dto/query-capacity.dto';

@Injectable()
export class CapacityService {
  constructor(private prisma: PrismaService) {}

  async create(createCapacityDto: CreateCapacityDto) {
    try {
      const capacity = await this.prisma.capacity.findFirst({
        where: { name_uz: createCapacityDto.name_uz },
      });

      if (capacity) {
        throw new ConflictException('Capacity already exists with name');
      }

      const data = await this.prisma.capacity.create({
        data: createCapacityDto,
      });

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async findAll(query: QueryCapacityDto) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'name_uz',
      orderBy = 'asc',
      name_en,
      name_ru,
      name_uz,
    } = query;

    const filter: any = {};

    if (name_uz) filter.name_uz = { mode: 'insensitive', contains: name_uz };
    if (name_ru) filter.name_ru = { mode: 'insensitive', contains: name_ru };
    if (name_en) filter.name_en = { mode: 'insensitive', contains: name_en };

    try {
      const data = await this.prisma.capacity.findMany({
        where: filter,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [sortBy]: orderBy,
        },
        include: { _count: true },
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
      const data = await this.prisma.capacity.findUnique({
        where: { id },
        include: { Tool: true },
      });

      if (!data) {
        throw new NotFoundException('Not found capacity');
      }

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateCapacityDto: UpdateCapacityDto) {
    try {
      const data = await this.prisma.capacity.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found capacity');
      }

      const updated = await this.prisma.capacity.update({
        where: { id },
        data: updateCapacityDto,
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
      const data = await this.prisma.capacity.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found capacity');
      }

      const deleted = await this.prisma.capacity.delete({
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
