import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryBrandDto } from './dto/query-brand.dto';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  async create(createBrandDto: CreateBrandDto) {
    try {
      const brand = await this.prisma.brand.findFirst({
        where: { name_uz: createBrandDto.name_uz },
      });

      if (brand) {
        throw new ConflictException('Brand already exists with name');
      }

      const data = await this.prisma.brand.create({ data: createBrandDto });

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async findAll(query: QueryBrandDto) {
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
      const data = await this.prisma.brand.findMany({
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
      const data = await this.prisma.brand.findUnique({
        where: { id },
        include: { Tool: true },
      });

      if (!data) {
        throw new NotFoundException('Not found brand');
      }

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    try {
      const data = await this.prisma.brand.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found brand');
      }

      const updated = await this.prisma.brand.update({
        where: { id },
        data: updateBrandDto,
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
      const data = await this.prisma.brand.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found brand');
      }

      const deleted = await this.prisma.brand.delete({
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
