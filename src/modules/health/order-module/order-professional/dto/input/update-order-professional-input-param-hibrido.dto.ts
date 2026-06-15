import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class UpdateOrderProfessionalInputParamDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The unique identifier of the order professional.',
  })
  @IsString({ message: 'ID must be a string.' })
  @IsNotEmpty({ message: 'ID is required.' })
  @IsUUID(4, { message: 'ID must be a valid UUIDv4.' })
  id: string;
}

export class UpdateOrderProfessionalInputBodyDto {
  @ApiProperty({
    example: 'c3d4e5f6-7890-12cd-efab-3456789012cd',
    description: 'The order item associated with the order professional.',
    required: false,
    nullable: true,
  })
  @IsString({ message: 'Order Item ID must be a string.' })
  @IsUUID(4, { message: 'Order Item ID must be a valid UUID.' })
  @IsOptional()
  orderItemId?: string;
}
