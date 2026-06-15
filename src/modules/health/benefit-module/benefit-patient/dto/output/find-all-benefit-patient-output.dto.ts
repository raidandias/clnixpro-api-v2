import { ApiProperty } from '@nestjs/swagger';
import { FindOneBenefitPatientOutputDto } from './find-one-benefit-patient-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllBenefitPatientOutputDto {
  @ApiProperty({ type: [FindOneBenefitPatientOutputDto] })
  data: FindOneBenefitPatientOutputDto[];

  @ApiProperty()
  pageInfo: PageInfo;
}
