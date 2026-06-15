import { PartialType } from '@nestjs/swagger';
import { FindOneItemInstrumentOutputDto } from './find-one-item-instrument-output.dto';

export class UpdateItemInstrumentOutputDto extends PartialType(
  FindOneItemInstrumentOutputDto,
) {}
