import { Module } from '@nestjs/common';
import { ItemCatalogExamService } from './item-catalog-exam.service';
import { ItemCatalogExamController } from './item-catalog-exam.controller';
import { ItemService } from '../item/item.service';
import { ItemModule } from '../item/item.module';

@Module({
  controllers: [ItemCatalogExamController],
  providers: [ItemCatalogExamService, ItemService],
  imports: [ItemModule],
})
export class ItemCatalogExamModule {}
