import { ApiProperty } from '@nestjs/swagger';
import { FindOneHealthMedicalCareOutputDto } from './find-one-health-medical-care-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllHealthMedicalCareOutputDto {
  @ApiProperty({ type: [FindOneHealthMedicalCareOutputDto] })
  data: FindOneHealthMedicalCareOutputDto[];

  @ApiProperty()
  pageInfo: PageInfo;
}
