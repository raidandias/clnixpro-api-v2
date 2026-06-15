import { ApiProperty } from '@nestjs/swagger';
import { DocumentStatus, DocumentType } from '@prisma/client';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';
import { IsFile } from 'src/share/utils/validators/is-file';

export class CreateUserDocumentInputParamDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsString({ message: 'The userId field must be a string' })
  @IsNotEmpty({ message: 'The userId field must not be empty' })
  @IsUUID(4, { message: 'The userId field must be a valid UUIDv4' })
  userId: string;
}
export class CreateUserDocumentInputBodyDto {
  @ApiProperty({
    example: DocumentType.CPF,
    enum: DocumentType,
    description: 'The document type',
  })
  type: DocumentType;

  @ApiProperty({
    example: '44411122246',
    description: 'The document number',
  })
  number: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @Validate(IsFile, { message: 'A file must be uploaded' })
  @IsOptional()
  filePath?: Express.Multer.File;
}
