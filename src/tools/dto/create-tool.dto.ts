import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateToolDto {
  @ApiProperty({ example: 'Drel' })
  @IsString()
  @IsNotEmpty()
  name_uz: string;

  @ApiProperty({ example: 'Drel' })
  @IsString()
  @IsNotEmpty()
  name_ru: string;

  @ApiProperty({ example: 'Drel' })
  @IsString()
  @IsNotEmpty()
  name_en: string;

  @ApiProperty({ example: 'Yaxshi drel' })
  @IsString()
  @IsNotEmpty()
  description_uz: string;

  @ApiProperty({ example: 'Yaxshi drel' })
  @IsString()
  @IsNotEmpty()
  description_ru: string;

  @ApiProperty({ example: 'Yaxshi drel' })
  @IsString()
  @IsNotEmpty()
  description_en: string;

  @ApiProperty({ example: 50000 })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @IsInt()
  @Min(0)
  count: number;

  @ApiProperty({ example: 'D0001' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: 'brand_id' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  brand_id?: string;

  @ApiProperty({ example: 'size_id' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  size_id?: string;

  @ApiProperty({ example: 'capacity_id' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  capacity_id?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty({ example: 'image.jpg' })
  @IsString()
  @IsNotEmpty()
  image: string;
}
