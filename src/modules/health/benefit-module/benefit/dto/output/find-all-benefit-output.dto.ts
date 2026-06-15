import { ApiProperty } from '@nestjs/swagger';
import { FindOneBenefitOutputDto } from './find-one-benefit-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllBenefitOutputDto {
  @ApiProperty({ type: [FindOneBenefitOutputDto] })
  data: FindOneBenefitOutputDto[];

  @ApiProperty()
  pageInfo: PageInfo;
}
