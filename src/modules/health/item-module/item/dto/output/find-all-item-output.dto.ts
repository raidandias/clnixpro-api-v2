import { ApiProperty } from '@nestjs/swagger';
import { FindOneItemOutputDto } from './find-one-item-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllItemOutputDto {
  @ApiProperty({ type: [FindOneItemOutputDto] })
  data: FindOneItemOutputDto[];

  @ApiProperty()
  pageInfo: PageInfo;
}
