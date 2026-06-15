import { Module } from '@nestjs/common';
import { ItemInstrumentService } from './item-instrument.service';
import { ItemInstrumentController } from './item-instrument.controller';
import { ItemService } from '../item/item.service';
import { ItemModule } from '../item/item.module';
import { ItemCatalogProductService } from '../item-catalog-product/item-catalog-product.service';
import { ItemCatalogServiceService } from '../item-catalog-service/item-catalog-service.service';
import { ItemCatalogExamService } from '../item-catalog-exam/item-catalog-exam.service';
import { ItemCatalogExamModule } from '../item-catalog-exam/item-catalog-exam.module';

@Module({
  controllers: [ItemInstrumentController],
  providers: [
    ItemInstrumentService,
    ItemService,
    ItemCatalogProductService,
    ItemCatalogServiceService,
  ],
  imports: [ItemModule],
})
export class ItemInstrumentModule {}
