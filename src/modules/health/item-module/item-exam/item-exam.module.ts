import { Module } from '@nestjs/common';
import { ItemExamService } from './item-exam.service';
import { ItemExamController } from './item-exam.controller';
import { ItemService } from '../item/item.service';
import { ItemModule } from '../item/item.module';
import { ItemCatalogExamService } from '../item-catalog-exam/item-catalog-exam.service';
import { ItemCatalogServiceService } from '../item-catalog-service/item-catalog-service.service';

@Module({
  controllers: [ItemExamController],
  providers: [
    ItemExamService,
    ItemService,
    ItemCatalogExamService,
    ItemCatalogServiceService,
  ],
  imports: [ItemModule],
})
export class ItemExamModule {}
