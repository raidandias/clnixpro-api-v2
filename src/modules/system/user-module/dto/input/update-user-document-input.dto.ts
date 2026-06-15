import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';
import { DocumentType, DocumentStatus } from '@prisma/client';
import { IsFile } from 'src/share/utils/validators/is-file';

export class UpdateUserDocumentInputParamDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsString({ message: 'The userId field must be a string' })
  @IsNotEmpty({ message: 'The userId field must not be empty' })
  @IsUUID(4, { message: 'The userId field must be a valid UUIDv4' })
  userId: string;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsString({ message: 'The documentId field must be a string' })
  @IsNotEmpty({ message: 'The documentId field must not be empty' })
  @IsUUID(4, { message: 'The documentId field must be a valid UUIDv4' })
  documentId: string;
}
export class UpdateUserDocumentInputBodyDto {
  @ApiProperty({
    example: `${DocumentType.CNH} | ${DocumentType.CNPJ} | ${DocumentType.CPF} | ${DocumentType.PASSPORT} | ${DocumentType.RG}`,
    enum: DocumentType,
    description: 'The document type',
    required: false,
  })
  @IsOptional()
  type?: DocumentType;

  @ApiProperty({
    example: '44411122246',
    description: 'The document number',
    required: false,
  })
  @IsOptional()
  number?: string;

  @ApiProperty({
    example: `${DocumentStatus.AWAITING_VERIFICATION} | ${DocumentStatus.SENT} | ${DocumentStatus.VERIFIED}`,
    enum: DocumentStatus,
    description: 'The status of the document',
    required: false,
  })
  @IsOptional()
  status?: DocumentStatus;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  @Validate(IsFile, { message: 'A file must be uploaded' })
  filePath?: Express.Multer.File;
}
