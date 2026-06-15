import { ApiProperty } from '@nestjs/swagger';

export class DeleteOrderProfessionalOutputDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The unique identifier of the order professional.',
  })
  id: string;

  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the order professional.',
  })
  accountId: string;

  @ApiProperty({
    example: 'b2c3d4e5-6789-01bc-defa-2345678901bc',
    description: 'The order associated with the order professional.',
  })
  orderId: string;

  @ApiProperty({
    example: 'c3d4e5f6-7890-12cd-efab-3456789012cd',
    description: 'The order item associated with the order professional.',
    nullable: true,
  })
  orderItemId: string | null;

  @ApiProperty({
    example: 'd4e5f6a7-8901-23de-fabc-4567890123de',
    description: 'The professional associated with the order.',
  })
  professionalId: string;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the order professional was created.',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the order professional was last updated.',
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the order professional was soft deleted.',
    nullable: true,
  })
  deletedAt: Date | null;
}
