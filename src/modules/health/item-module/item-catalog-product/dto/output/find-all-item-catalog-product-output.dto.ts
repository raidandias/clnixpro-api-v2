import { ApiProperty } from '@nestjs/swagger';
import { FindOneItemCatalogProductOutputDto } from './find-one-item-catalog-product-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllItemCatalogProductOutputDto {
  @ApiProperty({ type: [FindOneItemCatalogProductOutputDto] })
  data: FindOneItemCatalogProductOutputDto[];

  @ApiProperty()
  pageInfo: PageInfo;
}
