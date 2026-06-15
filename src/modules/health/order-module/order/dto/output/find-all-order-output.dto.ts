import { ApiProperty } from '@nestjs/swagger';
import { FindOneOrderOutputDto } from './find-one-order-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllOrderOutputDto {
  @ApiProperty({ type: [FindOneOrderOutputDto] })
  data: FindOneOrderOutputDto[];

  @ApiProperty()
  pageInfo: PageInfo;
}
