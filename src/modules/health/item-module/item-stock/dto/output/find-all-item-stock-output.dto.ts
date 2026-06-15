import { ApiProperty } from '@nestjs/swagger';
import { FindOneItemStockOutputDto } from './find-one-item-stock-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllItemStockOutputDto {
  @ApiProperty({ type: [FindOneItemStockOutputDto] })
  data: FindOneItemStockOutputDto[];

  @ApiProperty()
  pageInfo: PageInfo;
}
