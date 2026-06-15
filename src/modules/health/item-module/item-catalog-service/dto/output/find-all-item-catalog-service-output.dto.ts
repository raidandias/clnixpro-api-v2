import { ApiProperty } from '@nestjs/swagger';
import { FindOneItemCatalogServiceOutputDto } from './find-one-item-catalog-service-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllItemCatalogServiceOutputDto {
  @ApiProperty({ type: [FindOneItemCatalogServiceOutputDto] })
  data: FindOneItemCatalogServiceOutputDto[];

  @ApiProperty()
  pageInfo: PageInfo;
}
