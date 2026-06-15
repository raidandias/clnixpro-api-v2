import { ApiProperty } from '@nestjs/swagger';

export class UpdateInvoiceReceivableOutputDto {
  @ApiProperty({ example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab', description: 'The unique identifier of the invoice receivable.' })
  id: string;

  @ApiProperty({ example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab', description: 'The account associated with the invoice receivable.' })
  accountId: string;

  @ApiProperty({ example: 'b2c3d4e5-6789-01bc-defa-234567890abc', description: 'The order associated with the invoice receivable.' })
  orderId: string;

  @ApiProperty({ example: 'c3d4e5f6-7890-12cd-efab-3456789012cd', description: 'The customer associated with the invoice receivable.' })
  customerId: string;

  @ApiProperty({ example: 'AUTH-123456', description: 'The authorization number for the invoice receivable.', nullable: true })
  authorizationNumber: string | null;

  @ApiProperty({ example: 1, description: 'The installment number for the invoice receivable.' })
  installment: number;

  @ApiProperty({ example: 100.00, description: 'The total value of the invoice receivable.' })
  valueTotal: number;

  @ApiProperty({ example: 0.00, description: 'The discount value of the invoice receivable.' })
  valueDiscount: number;

  @ApiProperty({ example: 0.00, description: 'The fixed fees value of the invoice receivable.' })
  valueFeesFixed: number;

  @ApiProperty({ example: 0.00, description: 'The percentage fees value of the invoice receivable.' })
  valueFeesPercent: number;

  @ApiProperty({ example: '2024-01-15T10:00:00Z', description: 'The due date of the invoice receivable.' })
  dueAt: Date;

  @ApiProperty({ example: '2024-01-15T10:00:00Z', description: 'The payment date of the invoice receivable.', nullable: true })
  paymentAt: Date | null;

  @ApiProperty({ example: '2024-01-15T10:00:00Z', description: 'The date and time when the invoice receivable was created.' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-15T10:00:00Z', description: 'The date and time when the invoice receivable was last updated.' })
  updatedAt: Date;

  @ApiProperty({ example: '2024-01-15T10:00:00Z', description: 'The date and time when the invoice receivable was deleted.', nullable: true })
  deletedAt: Date | null;
}
