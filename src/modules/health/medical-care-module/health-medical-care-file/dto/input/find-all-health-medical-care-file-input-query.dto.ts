import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class FindAllHealthMedicalCareFileInputQueryDto {
  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'Filter by account ID.',
    required: false,
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: 'e5f6a7b8-9012-34ef-abcd-5678901234ef',
    description: 'Filter by health medical care record ID.',
    required: false,
  })
  @IsString({ message: 'Health Medical Care ID must be a string.' })
  @IsOptional()
  healthMedicalCareId?: string;

  @ApiProperty({
    example: 1,
    description: 'Page number for pagination.',
    required: true,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNotEmpty({ message: 'Page is required.' })
  page: number;

  @ApiProperty({
    example: 10,
    description: 'Number of items per page.',
    required: true,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNotEmpty({ message: 'PerPage is required.' })
  perPage: number;
}
