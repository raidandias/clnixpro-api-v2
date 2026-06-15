import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsValidDate } from 'src/share/utils/validators/IsValidDate';

export class CreateUserInputBodyDto {
  @ApiProperty({ example: 'John' })
  @IsNotEmpty({ message: 'Name is required.' })
  @IsString({ message: 'Name must be a string.' })
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Email must be valid.' })
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty({ message: 'Password is required.' })
  @IsString({ message: 'Password must be a string.' })
  password: string;

  @ApiProperty({ example: 'https://example.com/photo.jpg', required: false })
  @IsOptional()
  @IsString({ message: 'Photo must be a string.' })
  photo?: string;

  @ApiProperty({ example: '1', required: false })
  @IsOptional()
  @IsString({ message: 'Phone country code must be a string.' })
  countryCodePhone?: string;

  @ApiProperty({ example: '123', required: false })
  @IsOptional()
  @IsString({ message: 'Phone area code must be a string.' })
  areaCodePhone?: string;

  @ApiProperty({ example: '123456789', required: false })
  @IsOptional()
  @IsString({ message: 'Phone number must be a string.' })
  phoneNumber?: string;

  @ApiProperty({ example: '2000-01-01', required: false })
  @IsOptional()
  @IsValidDate({ message: 'Date of birth must be a valid date.' })
  dateOfBirth?: string;
}
