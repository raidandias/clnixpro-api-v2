import { PartialType } from '@nestjs/swagger';
import { FindOneItemCatalogServiceOutputDto } from './find-one-item-catalog-service-output.dto';

export class UpdateItemCatalogServiceOutputDto extends PartialType(
  FindOneItemCatalogServiceOutputDto,
) {}
