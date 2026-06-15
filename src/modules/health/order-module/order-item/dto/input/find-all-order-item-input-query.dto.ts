import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsOptional } from 'class-validator';

export class FindAllOrderItemInputQueryDto {
  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the order item.',
    required: false,
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: 'b2c3d4e5-6789-01bc-defa-2345678901bc',
    description: 'The order associated with the order item.',
    required: false,
  })
  @IsString({ message: 'Order ID must be a string.' })
  @IsOptional()
  orderId?: string;

  @ApiProperty({
    example: 'c3d4e5f6-7890-12cd-efab-3456789012cd',
    description: 'The item associated with the order item.',
    required: false,
  })
  @IsString({ message: 'Item ID must be a string.' })
  @IsOptional()
  itemId?: string;

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
