import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FindAllPatientInputQueryDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The unique identifier for the patient',
    required: false,
  })
  @IsString({ message: 'ID must be a string.' })
  @IsUUID(4, { message: 'ID must be a valid UUID.' })
  id: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'The ID of the associated user',
    required: false,
  })
  @IsString({ message: 'User ID must be a string.' })
  @IsUUID(4, { message: 'User ID must be a valid UUID.' })
  userId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440002',
    description: 'The ID of the associated account',
    required: false,
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  accountId: string;

  @ApiProperty({
    example: '2024-07-14T12:34:56.000Z',
    description: 'The creation timestamp of the patient record',
    required: false,
  })
  @IsString({ message: 'Created at must be a valid ISO 8601 date.' })
  createdAt: string;

  @ApiProperty({
    example: '2024-07-14T12:34:56.000Z',
    description: 'The last update timestamp of the patient record',
    required: false,
  })
  @IsString({ message: 'Updated at must be a valid ISO 8601 date.' })
  updatedAt: string;

  @ApiProperty({
    example: '2024-07-14T12:34:56.000Z',
    description: 'The deletion timestamp of the patient record',
    required: false,
  })
  @IsString({ message: 'Deleted at must be a valid ISO 8601 date.' })
  deletedAt?: string;

  @ApiProperty({ example: '1', description: 'Page actual', required: true })
  @IsString({ message: 'Page must be a string.' })
  @IsNotEmpty({ message: 'Page is required.' })
  page: string;

  @ApiProperty({
    example: '20',
    description: 'Quantity itens per page',
    required: true,
  })
  @IsString({ message: 'Per page must be a string.' })
  @IsNotEmpty({ message: 'Per page is required.' })
  perPage?: string;
}
