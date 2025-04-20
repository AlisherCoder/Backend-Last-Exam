import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

class Location {
  @IsString()
  @IsNotEmpty()
  lat: string;

  @IsString()
  @IsNotEmpty()
  long: string;
}

export class CreateOrderDto {
  @ApiProperty({ example: { lat: 'lat', long: 'long' } })
  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Location)
  location: Location;

  @ApiProperty({ example: 'adress' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: '2025-04-20' })
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty({ example: 500000 })
  @IsNumber()
  @IsPositive()
  total_sum: number;

  @ApiProperty({ example: 'CLICK' })
  @IsEnum(['CLICK', 'PAYME', 'CASH'])
  payment_type: PaymentType;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsNotEmpty()
  with_delivery: boolean;

  @ApiProperty({ example: 'Comment to delivery' })
  @IsString()
  @IsNotEmpty()
  comment_delivery: string;

  @ApiProperty({
    example: [
      {
        profession_id: 'profession_id',
        level_id: 'level_id',
        count: 2,
        measure: 'DAY',
        time: 1,
        total_sum: 500000,
      },
      {
        tool_id: 'tool_id',
        count: 2,
        measure: 'DAY',
        time: 1,
        total_sum: 100000,
      },
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  order_items: CreateOrderItemDto[];
}

export enum PaymentType {
  CLICK = 'CLICK',
  PAYME = 'PAYME',
  CASH = 'CASH',
}
export enum Measure {
  HOUR = 'HOUR',
  DAY = 'DAY',
}

class CreateOrderItemDto {
  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  tool_id?: string;

  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  profession_id?: string;

  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  level_id?: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  count: number;

  @IsEnum(Measure)
  @IsNotEmpty()
  measure: Measure;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  time: number;

  @IsNumber()
  @IsPositive()
  total_sum: number;
}
