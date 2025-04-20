import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateShowcaseDto } from './dto/create-showcase.dto';
import { UpdateShowcaseDto } from './dto/update-showcase.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadService } from 'src/upload/upload.service';
import { QueryBrandDto } from 'src/brand/dto/query-brand.dto';

@Injectable()
export class ShowcaseService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  async create(createShowcaseDto: CreateShowcaseDto) {
    try {
      let data = await this.prisma.showcase.create({ data: createShowcaseDto });

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
      const data = await this.prisma.showcase.findMany({
        where: filter,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [sortBy]: orderBy,
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
      let data = await this.prisma.showcase.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found showcase');
      }

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateShowcaseDto: UpdateShowcaseDto) {
    const { image } = updateShowcaseDto;
    try {
      let data = await this.prisma.showcase.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found showcase');
      }

      data = await this.prisma.showcase.update({
        where: { id },
        data: updateShowcaseDto,
      });

      if (image) {
        this.uploadService.deleteFile(data.image);
      }

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
      let data = await this.prisma.showcase.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found showcase');
      }

      data = await this.prisma.showcase.delete({ where: { id } });

      this.uploadService.deleteFile(data.image);

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}
