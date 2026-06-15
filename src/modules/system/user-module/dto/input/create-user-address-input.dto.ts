import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateAddressInputParamDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsString({ message: 'The userId field must be a string' })
  @IsNotEmpty({ message: 'The userId field must not be empty' })
  @IsUUID(4, { message: 'The userId field must be a valid UUIDv4' })
  userId: string;
}

export class CreateAddressInputBodyDto {
  @ApiProperty({
    example: 'Home',
    description: 'The label for the address',
    required: true,
  })
  @IsString()
  label: string;

  @ApiProperty({
    example: 'Avenida Paulista',
    description: 'The street of the address',
    required: true,
  })
  @IsString()
  street: string;

  @ApiProperty({
    example: 'São Paulo',
    description: 'The city of the address',
    required: true,
  })
  @IsString()
  city: string;

  @ApiProperty({
    example: 'SP',
    description: 'The state of the address',
    required: true,
  })
  @IsString()
  state: string;

  @ApiProperty({
    example: 'Brasil',
    description: 'The country of the address',
    required: true,
  })
  @IsString()
  country: string;

  @ApiProperty({
    example: 'Apt 1',
    description: 'The complement of the address',
    required: false,
  })
  @IsOptional()
  @IsString()
  complement?: string;
}
