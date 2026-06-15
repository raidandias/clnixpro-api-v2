import { ApiProperty } from '@nestjs/swagger';

export class CreateBenefitItemOutputDto {
  @ApiProperty({
    example: 'e7b7d8d6-2d77-4d1d-89b9-7eac02d8b03c',
    description: 'The unique identifier of the benefit item',
  })
  id: string;

  @ApiProperty({
    example: 'dbe5a8d5-80d7-4c9c-8d91-912d3db503e1',
    description: 'The account ID associated with the benefit item',
  })
  accountId: string;

  @ApiProperty({
    example: 'f1e2d3c4-5678-90ab-cdef-1234567890ab',
    description: 'The benefit ID associated with the benefit item',
  })
  benefitId: string;

  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The item ID associated with the benefit item',
  })
  itemId: string;

  @ApiProperty({
    example: 'b2c3d4e5-6789-01bc-defa-234567890abc',
    description: 'The item catalog ID associated with the benefit item',
  })
  itemCatalogId: string;

  @ApiProperty({
    example: 100.00,
    description: 'The price value of the benefit item',
  })
  valuePrice: number;

  @ApiProperty({
    example: 0.00,
    description: 'The discount applied to the benefit item',
  })
  discount: number;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the benefit item was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the benefit item was last updated',
  })
  updatedAt: Date;

  @ApiProperty({
    example: null,
    description: 'The date and time when the benefit item was deleted',
    nullable: true,
  })
  deletedAt?: Date;
}
