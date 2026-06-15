import { PartialType } from '@nestjs/swagger';
import { FindOneFileOutputDto } from './find-one-file-output.dto';

export class UpdateFileOutputDto extends PartialType(FindOneFileOutputDto) {}
