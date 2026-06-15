import { ApiProperty } from '@nestjs/swagger';

export class FindOneItemStockOutputDto {
  @ApiProperty({
    example: 'e7d62e5a-3b77-49ed-9dd4-c66d43f5af0f',
    description: 'The unique identifier for the item stock',
  })
  id: string;

  @ApiProperty({
    example: 'c7e8c317-bd17-41b8-9fa5-9b714e707e70',
    description: 'The ID of the related item catalog',
  })
  itemCatalogId: string;

  @ApiProperty({
    example: '10',
    description: 'The current amount of items in stock',
  })
  currentAmount: number;

  @ApiProperty({
    example: '5',
    description: 'The amount of items output from stock',
  })
  outputAmount: number;

  @ApiProperty({
    example: 'Warehouse A',
    description: 'The location of the item in stock',
  })
  location: string;

  @ApiProperty({
    example: '2023-07-01T00:00:00.000Z',
    description: 'The date and time the item was entered into stock',
  })
  entryAt: Date;

  @ApiProperty({
    example: '2023-07-05T00:00:00.000Z',
    description: 'The date and time the item was output from stock',
  })
  outputAt: Date;

  @ApiProperty({
    example: '2023-06-01T00:00:00.000Z',
    description: 'The date and time the item stock record was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-07-01T00:00:00.000Z',
    description: 'The date and time the item stock record was last updated',
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2023-08-01T00:00:00.000Z',
    description: 'The date and time the item stock record was deleted',
  })
  deletedAt: Date;
}
