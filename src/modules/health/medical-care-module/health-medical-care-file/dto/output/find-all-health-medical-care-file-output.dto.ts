import { ApiProperty } from '@nestjs/swagger';
import { FindOneHealthMedicalCareFileOutputDto } from './find-one-health-medical-care-file-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllHealthMedicalCareFileOutputDto {
  @ApiProperty({ type: [FindOneHealthMedicalCareFileOutputDto] })
  data: FindOneHealthMedicalCareFileOutputDto[];

  @ApiProperty()
  pageInfo: PageInfo;
}
