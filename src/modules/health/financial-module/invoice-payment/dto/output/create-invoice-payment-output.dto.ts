import { ApiProperty } from '@nestjs/swagger';
import { FormOfPaymentCurrency, TypeCurrencyExchange } from '@prisma/client';

export class CreateInvoicePaymentOutputDto {
  @ApiProperty({ example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab', description: 'The unique identifier of the invoice payment.' })
  id: string;

  @ApiProperty({ example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab', description: 'The account associated with the invoice payment.' })
  accountId: string;

  @ApiProperty({ example: 'b2c3d4e5-6789-01bc-defa-234567890abc', description: 'The invoice receivable associated with this payment.', nullable: true })
  invoiceReceivableId: string | null;

  @ApiProperty({ example: 'c3d4e5f6-7890-12cd-efab-3456789012cd', description: 'The invoice payable associated with this payment.', nullable: true })
  invoicePayableId: string | null;

  @ApiProperty({ example: 'Payment denied due to insufficient funds.', description: 'The description for a denied payment.', nullable: true })
  descriptionDenied: string | null;

  @ApiProperty({ example: 100.00, description: 'The payment value.' })
  valuePayment: number;

  @ApiProperty({ example: 0.00, description: 'The discount value of the invoice payment.' })
  valueDiscount: number;

  @ApiProperty({ example: 0.00, description: 'The fixed fees value of the invoice payment.' })
  valueFeesFixed: number;

  @ApiProperty({ example: 0.00, description: 'The percentage fees value of the invoice payment.' })
  valueFeesPercent: number;

  @ApiProperty({ example: FormOfPaymentCurrency.CASH, description: 'The form of payment.', enum: FormOfPaymentCurrency })
  formOfPayment: FormOfPaymentCurrency;

  @ApiProperty({ example: TypeCurrencyExchange.BRL, description: 'The type of currency exchange.', enum: TypeCurrencyExchange })
  typeCurrencyExchange: TypeCurrencyExchange;

  @ApiProperty({ example: '2024-01-15T10:00:00Z', description: 'The payment date.' })
  paymentAt: Date;

  @ApiProperty({ example: '2024-01-15T10:00:00Z', description: 'The date and time when the invoice payment was created.' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-15T10:00:00Z', description: 'The date and time when the invoice payment was last updated.' })
  updatedAt: Date;

  @ApiProperty({ example: '2024-01-15T10:00:00Z', description: 'The date and time when the invoice payment was deleted.', nullable: true })
  deletedAt: Date | null;
}
