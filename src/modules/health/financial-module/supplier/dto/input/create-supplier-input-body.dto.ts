import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUUID, IsEmail } from 'class-validator';

export class CreateSupplierInputBodyDto {
  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the supplier.',
    required: false,
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: 'b2c3d4e5-6789-01bc-defa-234567890abc',
    description: 'The professional associated with the supplier.',
    required: false,
    nullable: true,
  })
  @IsString({ message: 'Professional ID must be a string.' })
  @IsUUID(4, { message: 'Professional ID must be a valid UUID.' })
  @IsOptional()
  professionalId?: string;

  @ApiProperty({
    example: 'c3d4e5f6-7890-12cd-efab-3456789012cd',
    description: 'The health insurance associated with the supplier.',
    required: false,
    nullable: true,
  })
  @IsString({ message: 'Health Insurance ID must be a string.' })
  @IsUUID(4, { message: 'Health Insurance ID must be a valid UUID.' })
  @IsOptional()
  healthInsuranceId?: string;

  @ApiProperty({
    example: 'Supplier Name Ltda',
    description: 'The name of the supplier.',
  })
  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  @ApiProperty({
    example: 'supplier@example.com',
    description: 'The email address of the supplier.',
    required: false,
    nullable: true,
  })
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: '+1-555-000-0000',
    description: 'The phone number of the supplier.',
    required: false,
    nullable: true,
  })
  @IsString({ message: 'Phone must be a string.' })
  @IsOptional()
  phone?: string;
}
