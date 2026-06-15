import { ApiProperty } from '@nestjs/swagger';
import { DocumentStatus } from '@prisma/client';

export class CreateUserDocumentOutputDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The document ID',
  })
  id: string;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The user ID',
  })
  userId: string;

  @ApiProperty({
    example: `${DocumentStatus.AWAITING_VERIFICATION} | ${DocumentStatus.SENT} | ${DocumentStatus.VERIFIED}`,
    enum: DocumentStatus,
    description: 'The status of the document',
  })
  status: DocumentStatus;

  @ApiProperty({
    example: '2024-06-04T12:00:00.000Z',
    description: 'The date and time when the document was created',
    type: 'string',
    format: 'date-time',
  })
  createdAt: string;

  @ApiProperty({
    example: '2024-06-04T12:00:00.000Z',
    description: 'The date and time when the document was last updated',
    type: 'string',
    format: 'date-time',
  })
  updatedAt: string;
}
