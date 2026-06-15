import { ApiProperty } from '@nestjs/swagger';
import { ItemCategory } from '@prisma/client';

export class CreateItemOutputDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'Unique identifier for the item.',
  })
  id: string;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66b12a',
    description: 'The account ID associated with the item.',
  })
  accountId: string;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66b12b',
    description: 'The supplier ID associated with the item, can be null.',
  })
  supplierId: string;

  @ApiProperty({
    example: 'Sample Item',
    description: 'The name of the item.',
  })
  name: string;

  @ApiProperty({
    example: 'A detailed description of the item.',
    description: 'Description of the item.',
  })
  description: string;

  @ApiProperty({
    example: 'SERVICE',
    description: 'Category of the item, e.g., SERVICE or PRODUCT.',
    enum: ItemCategory,
  })
  category: ItemCategory;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The date and time when the item was created.',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2022-06-01T00:00:00Z',
    description: 'The date and time when the item was last updated.',
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'The date and time when the item was deleted, can be null.',
  })
  deletedAt: Date;
}
