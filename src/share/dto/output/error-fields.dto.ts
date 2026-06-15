import { ApiProperty } from '@nestjs/swagger';

export class DynamicFields {
  [key: string]: string[];
}

export class ErrorDetails {
  @ApiProperty({ type: DynamicFields, required: false })
  fields?: DynamicFields;

  @ApiProperty({ example: 'Error fetching users', required: false })
  message?: string;
}

export class ErrorResponseDto {
  @ApiProperty({ type: ErrorDetails, required: false })
  error?: ErrorDetails;

  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: '2024-05-24T02:22:05.797Z' })
  timestamp: string;

  @ApiProperty({ example: '/users/v1/create' })
  path: string;
}
