import { PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export enum Sort {
  full_name = 'full_name',
  isActive = 'isActive',
  year = 'year',
}

export enum SearchSort {
  min_work_hours = 'min_work_hours',
  price_hourly = 'price_hourly',
  price_daily = 'price_daily',
  experience = 'experience',
}

export class QueryMasterDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  full_name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phone?: string;

  @IsOptional()
  @IsEnum(['true', 'false'])
  @IsNotEmpty()
  isActive?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  year?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  maxYear?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  minYear?: Date;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  orderBy?: 'asc' | 'desc';

  @IsOptional()
  @IsEnum(Sort)
  sortBy?: Sort;
}

export class SearchMasterDto extends PickType(QueryMasterDto, [
  'page',
  'limit',
  'orderBy',
]) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  level_id?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  profession_id?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  min_work_hours?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  gteMin_work_hours?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  lteMin_work_hours?: number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  price_hourly?: Number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  gtePrice_hourly?: Number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  ltePrice_hourly?: Number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  price_daily?: Number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  gtePrice_daily?: Number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  ltePrice_daily?: Number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  experience?: Number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  gteExperience?: Number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  lteExperience?: Number;

  @IsOptional()
  @IsEnum(SearchSort)
  sortBy?: SearchSort;
}
