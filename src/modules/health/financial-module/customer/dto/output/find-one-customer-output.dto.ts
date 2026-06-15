import { ApiProperty } from '@nestjs/swagger';

export class FindOneCustomerOutputDto {
  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The unique identifier of the customer.',
  })
  id: string;

  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the customer.',
  })
  accountId: string;

  @ApiProperty({
    example: 'b2c3d4e5-6789-01bc-defa-234567890abc',
    description: 'The user associated with the customer.',
  })
  userId: string;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the customer was created.',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the customer was last updated.',
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the customer was deleted.',
    nullable: true,
  })
  deletedAt: Date | null;
}
