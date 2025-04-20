import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  IsNumber,
  Min,
  Max,
  IsInt,
  IsPositive,
  ValidateNested,
  IsOptional,
} from 'class-validator';

export class CreateProfessionDto {
  @ApiProperty({ example: 'Gardener' })
  @IsString()
  @IsNotEmpty()
  name_uz: string;

  @ApiProperty({ example: 'Gardener' })
  @IsString()
  @IsNotEmpty()
  name_ru: string;

  @ApiProperty({ example: 'Gardener' })
  @IsString()
  @IsNotEmpty()
  name_en: string;

  @ApiProperty({ example: 'image.jpg' })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty({
    example: [
      {
        level_id: 'level_id',
        min_work_hours: 2,
        price_hourly: 50000,
        price_daily: 40000,
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => LevelProfessionDto)
  levels?: LevelProfessionDto[];

  @ApiProperty({ example: ['tool_id', 'tool_id'] })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tools?: string[];
}

export class LevelProfessionDto {
  @IsString()
  @IsNotEmpty()
  level_id: string;

  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(24)
  @IsNotEmpty()
  min_work_hours: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price_hourly: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price_daily: number;
}
