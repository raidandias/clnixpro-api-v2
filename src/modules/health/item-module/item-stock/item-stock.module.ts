import { Module } from '@nestjs/common';
import { ItemStockService } from './item-stock.service';
import { ItemStockController } from './item-stock.controller';
import { ItemCatalogProductModule } from '../item-catalog-product/item-catalog-product.module';
import { ItemCatalogProductService } from '../item-catalog-product/item-catalog-product.service';
import { ItemService } from '../item/item.service';

@Module({
  controllers: [ItemStockController],
  providers: [ItemStockService, ItemCatalogProductService, ItemService],
  imports: [ItemCatalogProductModule],
})
export class ItemStockModule {}
