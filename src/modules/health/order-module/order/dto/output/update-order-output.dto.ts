import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';

export class UpdateOrderOutputDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The unique identifier of the order.',
  })
  id: string;

  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the order.',
  })
  accountId: string;

  @ApiProperty({
    example: 'b2c3d4e5-6789-01bc-defa-2345678901bc',
    description: 'The patient associated with the order.',
  })
  patientId: string;

  @ApiProperty({
    example: 'c3d4e5f6-7890-12cd-efab-3456789012cd',
    description: 'The health insurance associated with the order.',
    nullable: true,
  })
  healthInsuranceId: string | null;

  @ApiProperty({
    example: OrderStatus.CONFIRMED,
    description: 'The status of the order.',
    enum: OrderStatus,
  })
  status: OrderStatus;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the order was created.',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the order was last updated.',
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the order was deleted.',
    nullable: true,
  })
  deletedAt: Date | null;
}
