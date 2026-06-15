import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNotEmpty, IsDateString } from 'class-validator';

export class UpdateItemExamInputParamDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsString({ message: 'The Id field must be a string' })
  @IsNotEmpty({ message: 'The Id field must not be empty' })
  @IsUUID(4, { message: 'The Id field must be a valid UUIDv4' })
  id: string;
}

export class UpdateItemExamInputBodyDto {
  @ApiProperty({
    example: '2024-07-11T00:00:00Z',
    description: 'The date and time when the item instrument was deleted',
  })
  @IsNotEmpty({ message: 'Deleted At is required.' })
  @IsDateString(
    { strict: true },
    { message: 'Deleted At must be a valid date' },
  )
  deletedAt: Date;
}
