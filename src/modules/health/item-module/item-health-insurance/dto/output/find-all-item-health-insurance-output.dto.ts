import { ApiProperty } from '@nestjs/swagger';
import { FindOneItemHealthInsuranceOutputDto } from './find-one-item-health-insurance-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllItemHealthInsuranceOutputDto {
  @ApiProperty({ type: [FindOneItemHealthInsuranceOutputDto] })
  data: FindOneItemHealthInsuranceOutputDto[];

  @ApiProperty()
  pageInfo: PageInfo;
}
