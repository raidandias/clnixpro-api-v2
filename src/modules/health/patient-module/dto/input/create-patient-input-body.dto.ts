import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreatePatientInputBodyDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'The ID of the associated user',
  })
  @IsString({ message: 'User ID must be a string.' })
  @IsUUID(4, { message: 'User ID must be a valid UUID.' })
  userId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440002',
    description: 'The ID of the associated account',
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  accountId: string;
}
