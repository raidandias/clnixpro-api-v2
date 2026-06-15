import { IsString, IsOptional, IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAddressInputParamDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsString({ message: 'The userId field must be a string' })
  @IsNotEmpty({ message: 'The userId field must not be empty' })
  @IsUUID(4, { message: 'The userId field must be a valid UUIDv4' })
  userId: string;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsString({ message: 'The addressId field must be a string' })
  @IsNotEmpty({ message: 'The addressId field must not be empty' })
  @IsUUID(4, { message: 'The addressId field must be a valid UUIDv4' })
  addressId: string;
}

export class UpdateAddressInputBodyDto {
  @ApiProperty({
    example: 'Meu Endereço',
    description: 'The label for the address',
    required: false,
  })
  @IsOptional()
  @IsString()
  label?: string;

  @ApiProperty({
    example: '123 Main St',
    description: 'The street of the address',
    required: false,
  })
  @IsOptional()
  @IsString()
  street?: string;

  @ApiProperty({
    example: 'Springfield',
    description: 'The city of the address',
    required: false,
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    example: 'IL',
    description: 'The state of the address',
    required: false,
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({
    example: 'USA',
    description: 'The country of the address',
    required: false,
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({
    example: 'Apt 1',
    description: 'The complement of the address',
    required: false,
  })
  @IsOptional()
  @IsString()
  complement?: string;
}
