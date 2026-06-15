import { ApiProperty } from '@nestjs/swagger';
import { FindOneInvoicePayableOutputDto } from './find-one-invoice-payable-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllInvoicePayableOutputDto {
  @ApiProperty({ type: [FindOneInvoicePayableOutputDto], description: 'List of invoice payables.' })
  data: FindOneInvoicePayableOutputDto[];

  @ApiProperty({ description: 'Pagination information.' })
  pageInfo: PageInfo;
}
