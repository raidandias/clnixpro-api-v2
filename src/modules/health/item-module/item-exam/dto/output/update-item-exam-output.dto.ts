import { PartialType } from '@nestjs/swagger';
import { FindOneItemExamOutputDto } from './find-one-item-exam-output.dto';

export class UpdateItemExamOutputDto extends PartialType(
  FindOneItemExamOutputDto,
) {}
