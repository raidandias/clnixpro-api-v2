import { ApiProperty } from '@nestjs/swagger';
import { FindOnePatientOutputDto } from './find-one-patient-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllPatientOutputDto {
  @ApiProperty({ type: [FindOnePatientOutputDto] })
  data: FindOnePatientOutputDto[];

  @ApiProperty()
  pageInfo: PageInfo;
}
