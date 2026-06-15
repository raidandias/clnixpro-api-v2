import { ApiProperty } from '@nestjs/swagger';

export class DeleteInvoicePayableOutputDto {
  @ApiProperty({ example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab', description: 'The unique identifier of the invoice payable.' })
  id: string;

  @ApiProperty({ example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab', description: 'The account associated with the invoice payable.' })
  accountId: string;

  @ApiProperty({ example: 'b2c3d4e5-6789-01bc-defa-234567890abc', description: 'The supplier associated with the invoice payable.' })
  supplierId: string;

  @ApiProperty({ example: 'c3d4e5f6-7890-12cd-efab-3456789012cd', description: 'The order associated with the invoice payable.', nullable: true })
  orderId: string | null;

  @ApiProperty({ example: 100.00, description: 'The total value of the invoice payable.' })
  valueTotal: number;

  @ApiProperty({ example: 0.00, description: 'The discount value of the invoice payable.' })
  valueDiscount: number;

  @ApiProperty({ example: 0.00, description: 'The fixed fees value of the invoice payable.' })
  valueFeesFixed: number;

  @ApiProperty({ example: 0.00, description: 'The percentage fees value of the invoice payable.' })
  valueFeesPercent: number;

  @ApiProperty({ example: '2024-01-15T10:00:00Z', description: 'The due date of the invoice payable.' })
  dueAt: Date;

  @ApiProperty({ example: '2024-01-15T10:00:00Z', description: 'The payment date of the invoice payable.', nullable: true })
  paymentAt: Date | null;

  @ApiProperty({ example: '2024-01-15T10:00:00Z', description: 'The date and time when the invoice payable was created.' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-15T10:00:00Z', description: 'The date and time when the invoice payable was last updated.' })
  updatedAt: Date;

  @ApiProperty({ example: '2024-01-15T10:00:00Z', description: 'The date and time when the invoice payable was soft-deleted.', nullable: true })
  deletedAt: Date | null;
}
