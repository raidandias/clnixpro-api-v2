import { ApiProperty } from '@nestjs/swagger';
import { FindOneOrderProfessionalScheduleOutputDto } from './find-one-order-professional-schedule-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllOrderProfessionalScheduleOutputDto {
  @ApiProperty({ type: [FindOneOrderProfessionalScheduleOutputDto] })
  data: FindOneOrderProfessionalScheduleOutputDto[];

  @ApiProperty()
  pageInfo: PageInfo;
}
