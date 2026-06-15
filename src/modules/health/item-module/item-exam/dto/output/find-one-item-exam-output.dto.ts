import { ApiProperty } from '@nestjs/swagger';
import { FindOneItemCatalogExamOutputDto } from '../../../item-catalog-exam/dto/output/find-one-item-catalog-exam-output.dto';
import { IsOptional } from 'class-validator';

export class FindOneItemExamOutputDto {
  @ApiProperty({
    example: 'e7b7d8d6-2d77-4d1d-89b9-7eac02d8b03c',
    description: 'The unique identifier of the item instrument',
  })
  id: string;

  @ApiProperty({
    example: 'dbe5a8d5-80d7-4c9c-8d91-912d3db503e1',
    description: 'The account ID associated with the item instrument',
  })
  accountId: string;

  @ApiProperty({
    example: 'edc5f7b4-8d8f-4c4c-8d7b-1e8f7d9b03d3',
    description: 'The item ID associated with the item instrument',
  })
  itemId: string;

  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The item catalog Exam ID associated with the item instrument',
  })
  itemCatalogExamId: string;

  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description:
      'The item catalog Service ID associated with the item instrument',
  })
  itemCatalogServiceId: string;

  @ApiProperty({
    example: '2024-07-11T00:00:00Z',
    description: 'The date and time when the item instrument was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-07-11T00:00:00Z',
    description: 'The date and time when the item instrument was last updated',
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2024-07-11T00:00:00Z',
    description: 'The date and time when the item instrument was deleted',
  })
  @IsOptional()
  deletedAt?: Date;

  @ApiProperty({
    example: FindOneItemCatalogExamOutputDto,
    description: 'The status of the item instrument',
  })
  itemCatalogExam: FindOneItemCatalogExamOutputDto;
}
