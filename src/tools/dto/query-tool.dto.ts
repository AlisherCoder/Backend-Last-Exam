import { OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { QueryProfessionDto } from 'src/professions/dto/query-profession.dto';

export enum SortTool {
  name_uz = 'name_uz',
  name_ru = 'name_ru',
  name_en = 'name_en',
  price = 'price',
  count = 'count',
  isActive = 'isActive',
}

export class QueryToolDto extends OmitType(QueryProfessionDto, ['sortBy']) {
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  price: number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  maxPrice: number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  minPrice: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  count: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  maxCount: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minCount: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  brand_id: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  size_id: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  capacity_id: string;

  @IsOptional()
  @IsEnum(SortTool)
  sortBy?: SortTool;
}
