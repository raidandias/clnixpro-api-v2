import { ApiProperty } from '@nestjs/swagger';
import { FindOneStatementOutputDto } from './find-one-statement-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllStatementOutputDto {
  @ApiProperty({ type: [FindOneStatementOutputDto], description: 'List of statements.' })
  data: FindOneStatementOutputDto[];

  @ApiProperty({ description: 'Pagination information.' })
  pageInfo: PageInfo;
}
