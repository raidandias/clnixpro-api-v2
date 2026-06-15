import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class FindAllUsersInputQueryDto {
  @ApiProperty({ example: '1', required: false })
  @IsString({ message: 'The page must be a string.' })
  @IsOptional()
  page: string = '1';

  @ApiProperty({ example: '10', required: false })
  @IsString({ message: 'The quantity of items per page must be a string.' })
  @IsOptional()
  perPage: string = '10';

  @ApiProperty({ example: 'John', required: false })
  @IsString({ message: 'The name must be a string.' })
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'john@example.com', required: false })
  @IsString({ message: 'The email must be a string.' })
  @IsEmail({}, { message: 'The email must be valid.' })
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '123456789', required: false })
  @IsString({ message: 'The document number must be a valid field.' })
  @IsOptional()
  documentNumber?: string;

  @ApiProperty({ example: 'New York', required: false })
  @IsString({ message: 'The city must be a valid field.' })
  @IsOptional()
  city?: string;
}
