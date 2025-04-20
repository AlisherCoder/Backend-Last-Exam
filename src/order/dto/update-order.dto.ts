import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

enum StatusOrder {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  FINISHED = 'FINISHED',
}
export class UpdateOrderDto {
  @ApiProperty({ example: 'ACTIVE' })
  @IsEnum(StatusOrder)
  @IsNotEmpty()
  status: StatusOrder;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  paid?: boolean;

  @ApiProperty({ example: ['master_id', 'master_id'] })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  masters?: string[];
}
