import { ApiProperty } from '@nestjs/swagger';
import { AccountStatus } from '@prisma/client';

export class FindOneAccountOutputDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The account ID',
  })
  id: string;

  @ApiProperty({
    example: 'Company Name',
    description: 'The account name',
  })
  name: string;

  @ApiProperty({
    example: 'Corporate Name',
    description: 'The account corporate name',
  })
  corporateName: string;

  @ApiProperty({
    example: 'Fantasy Name',
    description: 'The account fantasy name',
  })
  fantasyName: string;

  @ApiProperty({
    example: 'http://example.com/photo.jpg',
    description: 'The account photo',
  })
  photo: string;

  @ApiProperty({
    example: 'Segment',
    description: 'The account segment',
  })
  segment: string;

  @ApiProperty({
    example: '123456789',
    description: 'The account document',
  })
  document: string;

  @ApiProperty({
    example: 'CNPJ',
    description: 'The account document type',
  })
  documentType: string;

  @ApiProperty({
    example: 'example.com',
    description: 'The account domain',
  })
  domain: string;

  @ApiProperty({
    example: 'contact@example.com',
    description: 'The account email',
  })
  email: string;

  @ApiProperty({
    example: '123 Main St',
    description: 'The account street',
  })
  street: string;

  @ApiProperty({
    example: 'State',
    description: 'The account state',
  })
  state: string;

  @ApiProperty({
    example: 'City',
    description: 'The account city',
  })
  city: string;

  @ApiProperty({
    example: 'Neighborhood',
    description: 'The account neighborhood',
  })
  neighborhood: string;

  @ApiProperty({
    example: 'Country',
    description: 'The account country',
  })
  country: string;

  @ApiProperty({
    example: '123456',
    description: 'The account zip code',
  })
  zipCode: string;

  @ApiProperty({
    example: 'Apt 101',
    description: 'The account complement',
  })
  complement: string;

  @ApiProperty({
    example: 'WAITING_APPROVAL',
    description: 'The account status',
    enum: AccountStatus,
  })
  status: AccountStatus;

  @ApiProperty({
    example: '55',
    description: 'The account country code phone',
  })
  countryCodePhone: string;

  @ApiProperty({
    example: '11',
    description: 'The account area code phone',
  })
  areaCodePhone: string;

  @ApiProperty({
    example: '987654321',
    description: 'The account phone number',
  })
  phoneNumber: string;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The account creation date',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The account update date',
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The account deletion date',
  })
  deletedAt: Date;
}

export class FindOneAccountIdNameOutputDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The account ID',
  })
  id: string;

  @ApiProperty({
    example: 'Company Name',
    description: 'The account name',
  })
  name: string;
}
