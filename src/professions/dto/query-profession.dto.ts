import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { QueryBrandDto } from 'src/brand/dto/query-brand.dto';

export class QueryProfessionDto extends QueryBrandDto {
  @IsOptional()
  @IsEnum(['true', 'false'])
  @IsNotEmpty()
  isActive?: string;
}
