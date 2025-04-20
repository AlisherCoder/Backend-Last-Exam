import { PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from 'src/guards/roles.decorator';
import { QueryMasterDto } from 'src/master/dto/query-master.dto';

export enum SortUser {
  full_name = 'full_name',
  status = 'status',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

export class QueryUserDto extends PickType(QueryMasterDto, [
  'full_name',
  'phone',
  'page',
  'limit',
  'orderBy',
]) {
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  region_id?: string;

  @IsOptional()
  @IsEnum(Role)
  @IsNotEmpty()
  role?: Role;

  @IsOptional()
  @IsEnum(['true', 'false'])
  @IsNotEmpty()
  status?: string;

  @IsOptional()
  @IsEnum(SortUser)
  sortBy?: SortUser;
}
