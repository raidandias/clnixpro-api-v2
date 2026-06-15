import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsOptional } from 'class-validator';

export class FindAllOrderProfessionalInputQueryDto {
  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the order professional.',
    required: false,
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: 'b2c3d4e5-6789-01bc-defa-2345678901bc',
    description: 'The order associated with the order professional.',
    required: false,
  })
  @IsString({ message: 'Order ID must be a string.' })
  @IsOptional()
  orderId?: string;

  @ApiProperty({
    example: 'd4e5f6a7-8901-23de-fabc-4567890123de',
    description: 'The professional associated with the order.',
    required: false,
  })
  @IsString({ message: 'Professional ID must be a string.' })
  @IsOptional()
  professionalId?: string;

  @ApiProperty({
    example: 1,
    description: 'Page number.',
    required: false,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  page?: number;

  @ApiProperty({
    example: 10,
    description: 'Number of items per page.',
    required: false,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  perPage?: number;
}
