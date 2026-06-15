import { ApiProperty } from '@nestjs/swagger';

export class DeleteSupplierOutputDto {
  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The unique identifier of the supplier.',
  })
  id: string;

  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the supplier.',
  })
  accountId: string;

  @ApiProperty({
    example: 'b2c3d4e5-6789-01bc-defa-234567890abc',
    description: 'The professional associated with the supplier.',
    nullable: true,
  })
  professionalId: string | null;

  @ApiProperty({
    example: 'c3d4e5f6-7890-12cd-efab-3456789012cd',
    description: 'The health insurance associated with the supplier.',
    nullable: true,
  })
  healthInsuranceId: string | null;

  @ApiProperty({
    example: 'Supplier Name Ltda',
    description: 'The name of the supplier.',
  })
  name: string;

  @ApiProperty({
    example: 'supplier@example.com',
    description: 'The email address of the supplier.',
    nullable: true,
  })
  email: string | null;

  @ApiProperty({
    example: '+1-555-000-0000',
    description: 'The phone number of the supplier.',
    nullable: true,
  })
  phone: string | null;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the supplier was created.',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the supplier was last updated.',
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the supplier was soft-deleted.',
    nullable: true,
  })
  deletedAt: Date | null;
}
