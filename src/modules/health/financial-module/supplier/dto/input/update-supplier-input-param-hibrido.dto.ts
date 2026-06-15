import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsOptional, IsEmail } from 'class-validator';

export class UpdateSupplierInputParamDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The unique identifier of the supplier.',
  })
  @IsString({ message: 'The Id field must be a string.' })
  @IsNotEmpty({ message: 'The Id field must not be empty.' })
  @IsUUID(4, { message: 'The Id field must be a valid UUIDv4.' })
  id: string;
}

export class UpdateSupplierInputBodyDto {
  @ApiProperty({
    example: 'Supplier Name Ltda',
    description: 'The name of the supplier.',
    required: false,
  })
  @IsString({ message: 'Name must be a string.' })
  @IsOptional()
  name?: string;

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
}
