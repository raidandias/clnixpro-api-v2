import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class FindAllFileInputQueryDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'Unique identifier for the file.',
  })
  @IsUUID(4, { message: 'ID must be a valid UUID.' })
  id: string;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The account ID associated with the file.',
  })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  accountId: string;

  @ApiProperty({
    example: 'File Name',
    description: 'The name of the file.',
    required: false,
  })
  @IsNotEmpty({ message: 'Name is required.' })
  @IsString({ message: 'Name must be a string.' })
  name: string;

  @ApiProperty({
    example: '/path/to/file',
    description: 'The storage path of the file.',
    required: false,
  })
  @IsNotEmpty({ message: 'Path is required.' })
  @IsString({ message: 'Path must be a string.' })
  path: string;

  @ApiProperty({
    example: 'image/png',
    description: 'The MIME type of the file.',
    required: false,
  })
  @IsNotEmpty({ message: 'Type is required.' })
  @IsString({ message: 'Type must be a string.' })
  type: string;

  @ApiProperty({
    example: '2024-11-03T10:00:00Z',
    description: 'Timestamp when the file was created.',
    required: false,
  })
  @IsString({ message: 'Created at must be a valid date.' })
  createdAt: string;

  @ApiProperty({
    example: '2024-11-03T10:00:00Z',
    description: 'Timestamp when the file was last updated.',
    required: false,
  })
  @IsString({ message: 'Updated at must be a valid date.' })
  updatedAt: string;

  @ApiProperty({
    example: '2024-11-03T10:00:00Z',
    description: 'Timestamp when the file was deleted (if applicable).',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Deleted at must be a valid date.' })
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
