import { ApiProperty } from '@nestjs/swagger';

export class FindOneOrderPaymentOutputDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The unique identifier of the order payment.',
  })
  id: string;

  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the order payment.',
  })
  accountId: string;

  @ApiProperty({
    example: 'b2c3d4e5-6789-01bc-defa-2345678901bc',
    description: 'The order associated with the payment.',
  })
  orderId: string;

  @ApiProperty({
    example: 'c3d4e5f6-7890-12cd-efab-3456789012cd',
    description: 'The order item associated with the payment.',
  })
  orderItemId: string;

  @ApiProperty({
    example: 'd4e5f6a7-8901-23de-fabc-4567890123de',
    description: 'The professional associated with the payment.',
  })
  professionalId: string;

  @ApiProperty({
    example: 100.00,
    description: 'The payment value.',
  })
  valuePayment: number;

  @ApiProperty({
    example: 10.00,
    description: 'The discount value applied to the payment.',
  })
  valueDiscount: number;

  @ApiProperty({
    example: 90.00,
    description: 'The total value after discount.',
  })
  valueTotal: number;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the payment was made.',
  })
  paymentAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the record was created.',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the record was last updated.',
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the record was deleted.',
    nullable: true,
  })
  deletedAt: Date | null;
}
