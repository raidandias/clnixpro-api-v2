import { ApiProperty } from '@nestjs/swagger';

export class DeleteBalanceOutputDto {
  @ApiProperty({ example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab', description: 'The unique identifier of the balance.' })
  id: string;

  @ApiProperty({ example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab', description: 'The account associated with the balance.' })
  accountId: string;

  @ApiProperty({ example: 100.00, description: 'The total receivable amount.' })
  totalReceivable: number;

  @ApiProperty({ example: 50.00, description: 'The total payable amount.' })
  totalPayable: number;

  @ApiProperty({ example: 50.00, description: 'The current balance amount.' })
  currentBalance: number;

  @ApiProperty({ example: '2024-01-15T10:00:00Z', description: 'The date and time when the balance was created.' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-15T10:00:00Z', description: 'The date and time when the balance was last updated.' })
  updatedAt: Date;
}
