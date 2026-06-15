import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { IsValidDate } from 'src/share/utils/validators/IsValidDate';

export class UpdateUserInputParamDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsString({ message: 'The Id field must be a string' })
  @IsNotEmpty({ message: 'The Id field must not be empty' })
  @IsUUID(4, { message: 'The Id field must be a valid UUIDv4' })
  id: string;
}

export class UpdateUserInputBodyDto {
  @ApiProperty({ example: 'John Doe', description: 'The user name' })
  @IsString({ message: 'The name must be a string' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The user email',
  })
  @IsEmail({}, { message: 'The email must be a valid email address' })
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: '1',
    description: 'The country code of the user phone',
  })
  @IsString({ message: 'The country code must be a string' })
  @IsOptional()
  countryCodePhone?: string;

  @ApiProperty({
    example: '123',
    description: 'The area code of the user phone',
  })
  @IsString({ message: 'The area code must be a string' })
  @IsOptional()
  areaCodePhone?: string;

  @ApiProperty({
    example: '987654321',
    description: 'The user phone number',
  })
  @IsString({ message: 'The phone number must be a string' })
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ example: '2000-01-01', required: false })
  @IsOptional()
  @IsValidDate({ message: 'Date of birth must be a valid date.' })
  dateOfBirth?: string;
}
