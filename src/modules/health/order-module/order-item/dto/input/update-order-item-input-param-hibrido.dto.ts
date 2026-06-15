import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsOptional, IsNumber } from 'class-validator';

export class UpdateOrderItemInputParamDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The unique identifier of the order item.',
  })
  @IsString({ message: 'ID must be a string.' })
  @IsNotEmpty({ message: 'ID is required.' })
  @IsUUID(4, { message: 'ID must be a valid UUIDv4.' })
  id: string;
}

export class UpdateOrderItemInputBodyDto {
  @ApiProperty({
    example: 2,
    description: 'The quantity of the item in the order.',
    required: false,
  })
  @IsNumber({}, { message: 'Quantity must be a number.' })
  @IsOptional()
  quantity?: number;
}
