import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class DeleteScheduleInputParamDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The unique identifier of the schedule to delete',
  })
  @IsString({ message: 'ID must be a string.' })
  @IsUUID(4, { message: 'ID must be a valid UUID.' })
  id: string;
}
