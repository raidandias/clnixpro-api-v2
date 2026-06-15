import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsNotEmpty,
  IsString,
  Validate,
  IsOptional,
} from 'class-validator';
import { IsFile } from 'src/share/utils/validators/is-file';

export class CreateFileInputBodyDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The account ID associated with the file.',
  })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  accountId: string;

  @ApiProperty({ example: 'File Name', description: 'The name of the file.' })
  @IsNotEmpty({ message: 'Name is required.' })
  @IsString({ message: 'Name must be a string.' })
  name: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  @Validate(IsFile, { message: 'A file must be uploaded' })
  file: Express.Multer.File;

  @ApiProperty({
    example: '/path/to/file',
    description: 'The storage path of the file.',
    required: false,
  })
  @IsString({ message: 'Path must be a string.' })
  @IsOptional()
  path?: string;
}
