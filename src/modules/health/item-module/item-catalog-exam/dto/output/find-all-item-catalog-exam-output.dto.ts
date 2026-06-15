import { ApiProperty } from '@nestjs/swagger';
import { FindOneItemCatalogExamOutputDto } from './find-one-item-catalog-exam-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllItemCatalogExamOutputDto {
  @ApiProperty({ type: [FindOneItemCatalogExamOutputDto] })
  data: FindOneItemCatalogExamOutputDto[];

  @ApiProperty()
  pageInfo: PageInfo;
}
