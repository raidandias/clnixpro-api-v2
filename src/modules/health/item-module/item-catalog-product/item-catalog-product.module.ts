import { Module } from '@nestjs/common';
import { ItemCatalogProductService } from './item-catalog-product.service';
import { ItemCatalogProductController } from './item-catalog-product.controller';
import { ItemModule } from '../item/item.module';
import { ItemService } from '../item/item.service';

@Module({
  controllers: [ItemCatalogProductController],
  providers: [ItemCatalogProductService, ItemService],
  imports: [ItemModule],
})
export class ItemCatalogProductModule {}
