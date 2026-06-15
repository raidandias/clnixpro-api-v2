import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';

export class DeleteStatementOutputDto {
  @ApiProperty({ example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab', description: 'The unique identifier of the statement.' })
  id: string;

  @ApiProperty({ example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab', description: 'The account associated with the statement.' })
  accountId: string;

  @ApiProperty({ example: 'b2c3d4e5-6789-01bc-defa-234567890abc', description: 'The invoice receivable associated with the statement.', nullable: true })
  invoiceReceivableId: string | null;

  @ApiProperty({ example: 'c3d4e5f6-7890-12cd-efab-3456789012cd', description: 'The invoice payable associated with the statement.', nullable: true })
  invoicePayableId: string | null;

  @ApiProperty({ example: 'd4e5f6a7-8901-23de-fabc-4567890123de', description: 'The invoice payment associated with the statement.', nullable: true })
  invoicePaymentId: string | null;

  @ApiProperty({ example: 100.00, description: 'The amount of the statement transaction.' })
  amount: number;

  @ApiProperty({ example: TransactionType.RECEIVABLE, description: 'The type of the transaction.', enum: TransactionType })
  transactionType: TransactionType;

  @ApiProperty({ example: '2024-01-15T10:00:00Z', description: 'The date and time when the statement was created.' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-15T10:00:00Z', description: 'The date and time when the statement was last updated.' })
  updatedAt: Date;
}
