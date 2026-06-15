import { PartialType } from '@nestjs/swagger';
import { FindOneItemStockOutputDto } from './find-one-item-stock-output.dto';

export class UpdateItemStockOutputDto extends PartialType(
  FindOneItemStockOutputDto,
) {}
