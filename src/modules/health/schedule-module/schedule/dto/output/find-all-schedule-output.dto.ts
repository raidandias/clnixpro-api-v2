import { ApiProperty } from '@nestjs/swagger';
import { FindOneScheduleOutputDto } from './find-one-schedule-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllScheduleOutputDto {
  @ApiProperty({ type: [FindOneScheduleOutputDto], description: 'List of schedules' })
  data: FindOneScheduleOutputDto[];

  @ApiProperty({ description: 'Pagination information' })
  pageInfo: PageInfo;
}
