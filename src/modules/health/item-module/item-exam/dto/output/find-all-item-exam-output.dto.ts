import { ApiProperty } from '@nestjs/swagger';
import { FindOneItemExamOutputDto } from './find-one-item-exam-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllItemExamOutputDto {
  @ApiProperty({ type: [FindOneItemExamOutputDto] })
  data: FindOneItemExamOutputDto[];

  @ApiProperty()
  pageInfo: PageInfo;
}
