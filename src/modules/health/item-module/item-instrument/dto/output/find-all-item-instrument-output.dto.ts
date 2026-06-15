import { ApiProperty } from '@nestjs/swagger';
import { FindOneItemInstrumentOutputDto } from './find-one-item-instrument-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllItemInstrumentOutputDto {
  @ApiProperty({ type: [FindOneItemInstrumentOutputDto] })
  data: FindOneItemInstrumentOutputDto[];

  @ApiProperty()
  pageInfo: PageInfo;
}
