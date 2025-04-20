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

export enum SortOrder {
  dete = 'date',
  total_sum = 'total_sum',
  with_delivery = 'with_delivery',
}

export enum PaymentType {
  CLICK = 'CLICK',
  PAYME = 'PAYME',
  CASH = 'CASH',
}

export enum StatusOrder {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  FINISHED = 'FINISHED',
}

export class QueryOrderDto {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  date?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  gteDate?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  lteDate?: Date;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  total_sum?: Number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  gteTotal_sum?: Number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  lteTotal_sum?: Number;

  @IsOptional()
  @IsEnum(['true', 'false'])
  @IsNotEmpty()
  with_delivery: string;

  @IsOptional()
  @IsString()
  @IsEnum(PaymentType)
  @IsNotEmpty()
  payment_type: PaymentType;

  @IsOptional()
  @IsEnum(['true', 'false'])
  @IsNotEmpty()
  paid: string;

  @IsOptional()
  @IsEnum(StatusOrder)
  @IsNotEmpty()
  status: StatusOrder;

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
  @IsEnum(SortOrder)
  sortBy?: SortOrder;
}
