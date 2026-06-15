import { ApiProperty } from '@nestjs/swagger';
import { FindOneOrderItemOutputDto } from './find-one-order-item-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllOrderItemOutputDto {
  @ApiProperty({ type: [FindOneOrderItemOutputDto] })
  data: FindOneOrderItemOutputDto[];

  @ApiProperty()
  pageInfo: PageInfo;
}
