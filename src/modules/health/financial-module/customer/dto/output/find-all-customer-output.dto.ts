import { ApiProperty } from '@nestjs/swagger';
import { FindOneCustomerOutputDto } from './find-one-customer-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllCustomerOutputDto {
  @ApiProperty({ type: [FindOneCustomerOutputDto], description: 'List of customers.' })
  data: FindOneCustomerOutputDto[];

  @ApiProperty({ description: 'Pagination information.' })
  pageInfo: PageInfo;
}
