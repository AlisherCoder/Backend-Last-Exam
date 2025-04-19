import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadService } from 'src/upload/upload.service';
import { QueryBrandDto } from 'src/brand/dto/query-brand.dto';

@Injectable()
export class PartnersService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  async create(createPartnerDto: CreatePartnerDto) {
    try {
      let data = await this.prisma.partners.create({ data: createPartnerDto });

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
      let data = await this.prisma.partners.findMany({
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
      let data = await this.prisma.partners.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found partner');
      }

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updatePartnerDto: UpdatePartnerDto) {
    try {
      let data = await this.prisma.partners.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found partner');
      }

      data = await this.prisma.partners.update({
        where: { id },
        data: updatePartnerDto,
      });

      if (updatePartnerDto.image) {
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
      let data = await this.prisma.partners.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found partner');
      }

      data = await this.prisma.partners.delete({ where: { id } });
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
