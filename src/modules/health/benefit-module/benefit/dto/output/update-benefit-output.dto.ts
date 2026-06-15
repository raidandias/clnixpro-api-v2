import { ApiProperty } from '@nestjs/swagger';

export class UpdateBenefitOutputDto {
  @ApiProperty({
    example: 'e7b7d8d6-2d77-4d1d-89b9-7eac02d8b03c',
    description: 'The unique identifier of the benefit',
  })
  id: string;

  @ApiProperty({
    example: 'dbe5a8d5-80d7-4c9c-8d91-912d3db503e1',
    description: 'The account ID associated with the benefit',
  })
  accountId: string;

  @ApiProperty({
    example: 'Basic Health Plan',
    description: 'The name of the benefit',
  })
  name: string;

  @ApiProperty({
    example: 'A comprehensive health benefit plan for patients',
    description: 'The description of the benefit',
  })
  description: string;

  @ApiProperty({
    example: 100.00,
    description: 'The price value of the benefit',
  })
  valuePrice: number;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the benefit was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the benefit was last updated',
  })
  updatedAt: Date;

  @ApiProperty({
    example: null,
    description: 'The date and time when the benefit was deleted',
    nullable: true,
  })
  deletedAt?: Date;
}
