import { Module } from '@nestjs/common';
import { ItemHealthInsuranceService } from './item-health-insurance.service';
import { ItemHealthInsuranceController } from './item-health-insurance.controller';
import { ItemService } from '../item/item.service';
import { ItemCatalogProductService } from '../item-catalog-product/item-catalog-product.service';
import { ItemCatalogServiceService } from '../item-catalog-service/item-catalog-service.service';
import { ItemCatalogExamService } from '../item-catalog-exam/item-catalog-exam.service';

@Module({
  controllers: [ItemHealthInsuranceController],
  providers: [
    ItemHealthInsuranceService,
    ItemService,
    ItemCatalogProductService,
    ItemCatalogServiceService,
    ItemCatalogExamService,
  ],
  imports: [],
})
export class ItemHealthInsuranceModule {}
