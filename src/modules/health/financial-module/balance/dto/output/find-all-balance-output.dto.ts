import { ApiProperty } from '@nestjs/swagger';
import { FindOneBalanceOutputDto } from './find-one-balance-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllBalanceOutputDto {
  @ApiProperty({ type: [FindOneBalanceOutputDto], description: 'List of balances.' })
  data: FindOneBalanceOutputDto[];

  @ApiProperty({ description: 'Pagination information.' })
  pageInfo: PageInfo;
}
