import { ApiProperty } from '@nestjs/swagger';
import { AccountStatus } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsUUID,
} from 'class-validator';

export class FindAllAccountInputQueryDto {
  @ApiProperty({
    example: 'gen_random_uuid()',
    description: 'The account ID',
    required: false,
  })
  @IsString({ message: 'ID must be a string.' })
  @IsUUID(4, { message: 'The Id field must be a valid UUIDv4' })
  @IsOptional()
  id?: string;

  @ApiProperty({
    example: 'Company Name',
    description: 'The account name',
    required: false,
  })
  @IsString({ message: 'Name must be a string.' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'Corporate Name',
    description: 'The account corporate name',
    required: false,
  })
  @IsString({ message: 'Corporate name must be a string.' })
  @IsOptional()
  corporateName?: string;

  @ApiProperty({
    example: 'Fantasy Name',
    description: 'The account fantasy name',
    required: false,
  })
  @IsString({ message: 'Fantasy name must be a string.' })
  @IsOptional()
  fantasyName?: string;

  @ApiProperty({
    example: 'Segment',
    description: 'The account segment',
    required: false,
  })
  @IsString({ message: 'Segment must be a string.' })
  @IsOptional()
  segment?: string;

  @ApiProperty({
    example: '123456789',
    description: 'The account document',
    required: false,
  })
  @IsString({ message: 'Document must be a string.' })
  @IsOptional()
  document?: string;

  @ApiProperty({
    example: 'CNPJ',
    description: 'The account document type',
    required: false,
  })
  @IsString({ message: 'Document type must be a string.' })
  @IsOptional()
  documentType?: string;

  @ApiProperty({
    example: 'example.com',
    description: 'The account domain',
    required: false,
  })
  @IsString({ message: 'Domain must be a string.' })
  @IsOptional()
  domain?: string;

  @ApiProperty({
    example: 'contact@example.com',
    description: 'The account email',
    required: false,
  })
  @IsEmail({}, { message: 'Email must be valid.' })
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: '123 Main St',
    description: 'The account street',
    required: false,
  })
  @IsString({ message: 'Street must be a string.' })
  @IsOptional()
  street?: string;

  @ApiProperty({
    example: 'State',
    description: 'The account state',
    required: false,
  })
  @IsString({ message: 'State must be a string.' })
  @IsOptional()
  state?: string;

  @ApiProperty({
    example: 'City',
    description: 'The account city',
    required: false,
  })
  @IsString({ message: 'City must be a string.' })
  @IsOptional()
  city?: string;

  @ApiProperty({
    example: 'Neighborhood',
    description: 'The account neighborhood',
    required: false,
  })
  @IsString({ message: 'Neighborhood must be a string.' })
  @IsOptional()
  neighborhood?: string;

  @ApiProperty({
    example: 'Country',
    description: 'The account country',
    required: false,
  })
  @IsString({ message: 'Country must be a string.' })
  @IsOptional()
  country?: string;

  @ApiProperty({
    example: '123456',
    description: 'The account zip code',
    required: false,
  })
  @IsString({ message: 'Zip code must be a string.' })
  @IsOptional()
  zipCode?: string;

  @ApiProperty({
    example: 'Apt 101',
    description: 'The account complement',
    required: false,
  })
  @IsString({ message: 'Complement must be a string.' })
  @IsOptional()
  complement?: string;

  @ApiProperty({
    example: 'WAITING_APPROVAL',
    description: 'The account status',
    required: false,
  })
  @IsString({ message: 'Status must be one of the allowed values.' })
  @IsOptional()
  status?: AccountStatus;

  @ApiProperty({
    example: '1',
    description: 'The account country code phone',
    required: false,
  })
  @IsString({ message: 'Phone country code must be a string.' })
  @IsOptional()
  countryCodePhone?: string;

  @ApiProperty({
    example: '123',
    description: 'The account area code phone',
    required: false,
  })
  @IsString({ message: 'Phone area code must be a string.' })
  @IsOptional()
  areaCodePhone?: string;

  @ApiProperty({
    example: '123456789',
    description: 'The account phone number',
    required: false,
  })
  @IsString({ message: 'Phone number must be a string.' })
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The account creation date',
    required: false,
  })
  @IsString({ message: 'Created at must be a valid date.' })
  @IsOptional()
  createdAt?: string;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The account update date',
    required: false,
  })
  @IsString({ message: 'Updated at must be a valid date.' })
  @IsOptional()
  updatedAt?: string;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The account deletion date',
    required: false,
  })
  @IsString({ message: 'Deleted at must be a valid date.' })
  @IsOptional()
  deletedAt?: string;

  @ApiProperty({ example: '1', description: 'Page actual', required: true })
  @IsString({ message: 'Page must be a string.' })
  @IsNotEmpty({ message: 'Page is required.' })
  page: string;

  @ApiProperty({
    example: '20',
    description: 'Quantity itens per page',
    required: true,
  })
  @IsString({ message: 'Per page must be a string.' })
  @IsNotEmpty({ message: 'Per page is required.' })
  perPage: string;
}
