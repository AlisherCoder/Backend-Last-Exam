import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryBrandDto } from 'src/brand/dto/query-brand.dto';

@Injectable()
export class LevelsService {
  constructor(private prisma: PrismaService) {}

  async create(createLevelDto: CreateLevelDto) {
    try {
      const level = await this.prisma.level.findFirst({
        where: { name_uz: createLevelDto.name_uz },
      });

      if (level) {
        throw new ConflictException('Level already exists');
      }

      const data = await this.prisma.level.create({
        data: createLevelDto,
      });

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
      const data = await this.prisma.level.findMany({
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
      const data = await this.prisma.level.findUnique({
        where: { id },
        include: { LevelsProfessions: { include: { Profession: true } } },
      });

      if (!data) {
        throw new NotFoundException('No level found');
      }

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateLevelDto: UpdateLevelDto) {
    const { name_uz } = updateLevelDto;
    try {
      if (name_uz) {
        const level = await this.prisma.level.findFirst({
          where: { name_uz: updateLevelDto.name_uz },
        });

        if (level) {
          throw new ConflictException('Level already exists');
        }
      }

      const data = await this.prisma.level.update({
        where: { id },
        data: updateLevelDto,
      });

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const data = await this.prisma.level.delete({ where: { id } });

      if (!data) {
        throw new NotFoundException('No level found');
      }

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}
