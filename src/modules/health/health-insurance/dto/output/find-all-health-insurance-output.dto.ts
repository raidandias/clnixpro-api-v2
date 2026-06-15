import { ApiProperty } from '@nestjs/swagger';
import { FindOneHealthInsuranceOutputDto } from './find-one-health-insurance-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllHealthInsuranceOutputDto {
  @ApiProperty({ type: [FindOneHealthInsuranceOutputDto] })
  data: FindOneHealthInsuranceOutputDto[];

  @ApiProperty()
  pageInfo: PageInfo;
}
