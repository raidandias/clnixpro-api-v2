import { ApiProperty } from '@nestjs/swagger';
import { FindOneItemCatalogServiceOutputDto } from 'src/modules/health/item-module/item-catalog-service/dto/output/find-one-item-catalog-service-output.dto';

export class ProfessionalItemCatalogOutputDto {
  @ApiProperty({
    description: 'Catálogo do item associado ao profissional',
    type: () => FindOneItemCatalogServiceOutputDto,
  })
  itemCatalog: FindOneItemCatalogServiceOutputDto;
}
