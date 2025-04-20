import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadService } from 'src/upload/upload.service';
import { QueryToolDto } from './dto/query-tool.dto';

@Injectable()
export class ToolsService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  async create(createToolDto: CreateToolDto) {
    const { brand_id, size_id, capacity_id } = createToolDto;
    try {
      const brand = await this.prisma.brand.findUnique({
        where: { id: brand_id },
      });

      if (!brand) {
        throw new ConflictException('Not found brand with this brand id');
      }

      const size = await this.prisma.size.findUnique({
        where: { id: size_id },
      });

      if (!size) {
        throw new ConflictException('Not found size with this size id');
      }

      const capacity = await this.prisma.capacity.findUnique({
        where: { id: capacity_id },
      });

      if (!capacity) {
        throw new ConflictException('Not found capacity with this capacity id');
      }

      const tool = await this.prisma.tool.findUnique({
        where: { code: createToolDto.code },
      });

      if (tool) {
        throw new ConflictException('Tool already exists with this code');
      }

      const data = await this.prisma.tool.create({ data: createToolDto });

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async findAll(query: QueryToolDto) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'name_uz',
      orderBy = 'asc',
      name_en,
      name_ru,
      name_uz,
      isActive,
      price,
      maxPrice,
      minPrice,
      count,
      maxCount,
      minCount,
      brand_id,
      size_id,
      capacity_id,
      code,
    } = query;

    const filter: any = {};

    if (name_uz) filter.name_uz = { mode: 'insensitive', contains: name_uz };
    if (name_ru) filter.name_ru = { mode: 'insensitive', contains: name_ru };
    if (name_en) filter.name_en = { mode: 'insensitive', contains: name_en };

    if (code) filter.code = code;
    if (brand_id) filter.brand_id = brand_id;
    if (size_id) filter.size_id = size_id;
    if (capacity_id) filter.capacity_id = capacity_id;

    if (isActive == 'true') filter.isActive = true;
    if (isActive == 'false') filter.isActive = false;

    if (price || maxPrice || minPrice) {
      filter.price = {
        gte: minPrice,
        lte: maxPrice,
        equals: price,
      };
    }

    if (count || maxCount || minCount) {
      filter.count = {
        gte: minCount,
        lte: maxCount,
        equals: count,
      };
    }

    try {
      let data = await this.prisma.tool.findMany({
        where: filter,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [sortBy]: orderBy,
        },
        include: {
          Brand: true,
          Size: true,
          Capacity: true,
          _count: true,
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
      const data = await this.prisma.tool.findUnique({
        where: { id },
        include: { Professions: true, Brand: true, Size: true, Capacity: true },
      });

      if (!data) {
        throw new NotFoundException('Not found tool');
      }

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateToolDto: UpdateToolDto) {
    const { code, brand_id, size_id, capacity_id } = updateToolDto;
    try {
      const data = await this.prisma.tool.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found tool');
      }

      if (code) {
        const tool = await this.prisma.tool.findUnique({
          where: { code },
        });

        if (tool) {
          throw new BadRequestException('Tool already exists with this code');
        }
      }

      if (brand_id) {
        const brand = await this.prisma.brand.findUnique({
          where: { id: brand_id },
        });

        if (!brand) {
          throw new NotFoundException('Not found brand with this brand id');
        }
      }

      if (size_id) {
        const size = await this.prisma.size.findUnique({
          where: { id: size_id },
        });

        if (!size) {
          throw new NotFoundException('Not found size with this size id');
        }
      }

      if (capacity_id) {
        const capacity = await this.prisma.capacity.findUnique({
          where: { id: capacity_id },
        });

        if (!capacity) {
          throw new NotFoundException(
            'Not found capacity with this capacity id',
          );
        }
      }

      const updated = await this.prisma.tool.update({
        where: { id },
        data: updateToolDto,
      });

      if (updateToolDto.image) {
        await this.uploadService.deleteFile(data.image);
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
      const data = await this.prisma.tool.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException('Not found tool');
      }

      const deleted = await this.prisma.tool.delete({
        where: { id },
      });

      await this.uploadService.deleteFile(deleted.image);

      return { data: deleted };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}
