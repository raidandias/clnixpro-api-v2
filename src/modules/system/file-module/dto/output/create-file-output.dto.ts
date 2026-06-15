import { ApiProperty } from '@nestjs/swagger';

export class CreateFileOutputDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The unique identifier for the file',
  })
  id: string;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The ID of the associated account',
  })
  accountId: string;

  @ApiProperty({
    example: 'file_name.txt',
    description: 'The name of the file',
  })
  name: string;

  @ApiProperty({
    example: '/path/to/file/file_name.txt',
    description: 'The file path in the storage system',
  })
  path: string;

  @ApiProperty({
    example: 'text/plain',
    description: 'The MIME type of the file',
  })
  type: string;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The date and time when the file was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The date and time when the file was last updated',
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The date and time when the file was deleted',
  })
  deletedAt: Date;
}
