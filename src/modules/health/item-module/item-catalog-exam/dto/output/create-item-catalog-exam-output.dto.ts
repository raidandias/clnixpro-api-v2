import { ApiProperty } from '@nestjs/swagger';
import { BodyMembers } from '@prisma/client';
import { FindOneItemOutputDto } from '../../../item/dto/output/find-one-item-output.dto';

export class CreateItemCatalogExamOutputDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The unique identifier for the item.',
  })
  id: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The ID of the related item.',
  })
  itemId: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The ID of the related account.',
  })
  accountId: string;

  @ApiProperty({
    example: 'Example Item',
    description: 'The name of the item.',
  })
  name: string;

  @ApiProperty({
    example: 'Item Title',
    description: 'The title of the item.',
  })
  title?: string;

  @ApiProperty({
    example: 'This is a detailed description of the item.',
    description: 'The description of the item.',
  })
  description?: string;

  @ApiProperty({
    example: 100.12,
    description: 'The price of the item.',
  })
  price: number;

  @ApiProperty({
    example: 50.76,
    description: 'The cost price of the item.',
  })
  costPrice: number;

  @ApiProperty({
    example: false,
    description: 'Indicates if the item has a benefit.',
  })
  flagBenefit: boolean;

  @ApiProperty({
    example: 30,
    description: 'The duration of the item in minutes.',
  })
  duration?: number;

  @ApiProperty({
    example: BodyMembers.HANDS,
    description: 'The body members related to the item.',
    enum: BodyMembers,
  })
  bodyMembers: BodyMembers;

  @ApiProperty({
    example: 'General Exam',
    description: 'The type of exam related to the item.',
  })
  typeExam: string;

  @ApiProperty({
    example: 'Standard Protocol',
    description: 'The protocol for the item.',
  })
  protocol: string;

  @ApiProperty({
    example: 'Indications for the item.',
    description: 'The indications for the item.',
  })
  indications: string;

  @ApiProperty({
    example: 'Professional observation details.',
    description: 'The observation for professional regarding the item.',
  })
  observationForProfessional: string;

  @ApiProperty({
    example: 'Patient observation details.',
    description: 'The observation for patient regarding the item.',
  })
  observationForPatient: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'The creation date of the item.',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'The last update date of the item.',
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'The deletion date of the item.',
  })
  deletedAt: Date;

  @ApiProperty({
    example: FindOneItemOutputDto,
    description: 'The unique identifier for the item.',
  })
  item?: FindOneItemOutputDto;
}
