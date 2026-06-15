import { Module } from '@nestjs/common';
import { ItemCatalogServiceService } from './item-catalog-service.service';
import { ItemCatalogServiceController } from './item-catalog-service.controller';
import { ItemService } from '../item/item.service';

@Module({
  controllers: [ItemCatalogServiceController],
  providers: [ItemCatalogServiceService, ItemService],
  imports: [],
})
export class ItemCatalogServiceModule {}
