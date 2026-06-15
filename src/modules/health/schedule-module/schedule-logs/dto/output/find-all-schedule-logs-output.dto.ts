import { ApiProperty } from '@nestjs/swagger';
import { FindOneScheduleLogsOutputDto } from './find-one-schedule-logs-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllScheduleLogsOutputDto {
  @ApiProperty({ type: [FindOneScheduleLogsOutputDto], description: 'List of schedule logs' })
  data: FindOneScheduleLogsOutputDto[];

  @ApiProperty({ description: 'Pagination information' })
  pageInfo: PageInfo;
}
