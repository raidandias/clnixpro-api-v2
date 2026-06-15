import { ApiProperty } from '@nestjs/swagger';
import { AccountStatus } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsUUID,
} from 'class-validator';

export class UpdateAccountInputParamDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsString({ message: 'The Id field must be a string' })
  @IsNotEmpty({ message: 'The Id field must not be empty' })
  @IsUUID(4, { message: 'The Id field must be a valid UUIDv4' })
  id: string;
}

export class UpdateAccountInputBodyDto {
  @ApiProperty({ example: 'Company Name', description: 'The account name' })
  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  @ApiProperty({
    example: 'Corporate Name',
    description: 'The account corporate name',
  })
  @IsString({ message: 'Corporate name must be a string.' })
  @IsOptional()
  corporateName?: string;

  @ApiProperty({
    example: 'Fantasy Name',
    description: 'The account fantasy name',
  })
  @IsString({ message: 'Fantasy name must be a string.' })
  @IsOptional()
  fantasyName?: string;

  @ApiProperty({ example: 'Segment', description: 'The account segment' })
  @IsString({ message: 'Segment must be a string.' })
  @IsOptional()
  segment?: string;

  @ApiProperty({ example: '123456789', description: 'The account document' })
  @IsString({ message: 'Document must be a string.' })
  @IsNotEmpty({ message: 'Document is required.' })
  document: string;

  @ApiProperty({ example: 'CNPJ', description: 'The account document type' })
  @IsString({ message: 'Document type must be a string.' })
  @IsOptional()
  documentType?: string;

  @ApiProperty({ example: 'example.com', description: 'The account domain' })
  @IsString({ message: 'Domain must be a string.' })
  @IsOptional()
  domain?: string;

  @ApiProperty({
    example: 'contact@example.com',
    description: 'The account email',
  })
  @IsEmail({}, { message: 'Email must be valid.' })
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '123 Main St', description: 'The account street' })
  @IsString({ message: 'Street must be a string.' })
  @IsOptional()
  street?: string;

  @ApiProperty({ example: 'State', description: 'The account state' })
  @IsString({ message: 'State must be a string.' })
  @IsOptional()
  state?: string;

  @ApiProperty({ example: 'City', description: 'The account city' })
  @IsString({ message: 'City must be a string.' })
  @IsOptional()
  city?: string;

  @ApiProperty({
    example: 'Neighborhood',
    description: 'The account neighborhood',
  })
  @IsString({ message: 'Neighborhood must be a string.' })
  @IsOptional()
  neighborhood?: string;

  @ApiProperty({ example: 'Country', description: 'The account country' })
  @IsString({ message: 'Country must be a string.' })
  @IsOptional()
  country?: string;

  @ApiProperty({ example: '123456', description: 'The account zip code' })
  @IsString({ message: 'Zip code must be a string.' })
  @IsOptional()
  zipCode?: string;

  @ApiProperty({ example: 'Apt 101', description: 'The account complement' })
  @IsString({ message: 'Complement must be a string.' })
  @IsOptional()
  complement?: string;

  @ApiProperty({
    example: 'WAITING_APPROVAL',
    description: 'The account status',
  })
  @IsString({ message: 'Status must be one of the allowed values.' })
  status: AccountStatus;

  @ApiProperty({ example: '1', description: 'The account country code phone' })
  @IsString({ message: 'Phone country code must be a string.' })
  @IsOptional()
  countryCodePhone?: string;

  @ApiProperty({ example: '123', description: 'The account area code phone' })
  @IsString({ message: 'Phone area code must be a string.' })
  @IsOptional()
  areaCodePhone?: string;

  @ApiProperty({
    example: '123456789',
    description: 'The account phone number',
  })
  @IsString({ message: 'Phone number must be a string.' })
  @IsOptional()
  phoneNumber?: string;
}
