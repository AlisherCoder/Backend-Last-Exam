import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export class CompanyDto {
  @ApiProperty({ example: 'Company_nameee' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'INN_Tax_Identification_Number' })
  @IsString()
  @IsNotEmpty()
  inn: string;

  @ApiProperty({ example: 'MFO_Bank_Code' })
  @IsString()
  @IsNotEmpty()
  mfo: string;

  @ApiProperty({ example: ' R-S_Bank_Account' })
  @IsString()
  @IsNotEmpty()
  rs: string;

  @ApiProperty({ example: 'Bank_Name' })
  @IsString()
  @IsNotEmpty()
  bank: string;

  @ApiProperty({ example: 'OKED_Business_Activity_Code' })
  @IsString()
  @IsNotEmpty()
  oked: string;

  @ApiProperty({ example: 'Company_Address' })
  @IsString()
  @IsNotEmpty()
  address: string;
}

export class CreateAuthDto {
  @ApiProperty({ example: 'Alex Fergison' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(2)
  full_name: string;

  @ApiProperty({ example: '+998953901313' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+998[0-9]{2}\d{7}$/, {
    message: 'The phone number format must be only: +998901234567.',
  })
  phone: string;

  @ApiProperty({ example: 'root' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'The password must contain only letters and numbers.',
  })
  @MinLength(4)
  @MaxLength(32)
  password: string;

  @ApiProperty({ example: 'region_id' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  region_id?: string;

  @ApiProperty({ example: 'USER_YUR' })
  @IsEnum(['USER_FIZ', 'USER_YUR'])
  @IsString()
  @IsNotEmpty()
  role: 'USER_FIZ' | 'USER_YUR';

  @ApiProperty({ type: CompanyDto, required: false })
  @ValidateNested()
  @Type(() => CompanyDto)
  @ValidateIf((dto) => dto.role === 'USER_YUR')
  @IsNotEmpty({
    message:
      'Company information should not be empty if role user equel USER_YUR',
  })
  company?: CompanyDto;
}

export class LoginAuthDto extends PickType(CreateAuthDto, [
  'phone',
  'password',
]) {}

export class SendOtpDto extends PickType(CreateAuthDto, ['phone']) {}

export class ActivateDto extends PickType(CreateAuthDto, ['phone']) {
  @ApiProperty({ example: '09121' })
  @IsString()
  @IsNotEmpty()
  otp: string;
}

export class ResetPasswordDto extends PickType(ActivateDto, ['phone', 'otp']) {
  @ApiProperty({ example: 'root1234' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'The password must contain only letters and numbers.',
  })
  @MinLength(4)
  @MaxLength(32)
  newPassword: string;
}

export class RefreshTokenDto {
  @ApiProperty({ example: 'refresh_token' })
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}
