import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class FindOneFileInputParamDto {
  @ApiProperty({
    example:
      '9babebb0-27d7-4e2c-80b6-ce05990eb33a/0341e2f5-11a5-4c99-a464-5a343b2831c2-face.csv',
  })
  @IsString({ message: 'The Id path must be a string' })
  @IsNotEmpty({ message: 'The path field must not be empty' })
  path: string;
}
