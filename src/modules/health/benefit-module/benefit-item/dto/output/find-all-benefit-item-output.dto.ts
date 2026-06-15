import { ApiProperty } from '@nestjs/swagger';
import { FindOneBenefitItemOutputDto } from './find-one-benefit-item-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllBenefitItemOutputDto {
  @ApiProperty({ type: [FindOneBenefitItemOutputDto] })
  data: FindOneBenefitItemOutputDto[];

  @ApiProperty()
  pageInfo: PageInfo;
}
