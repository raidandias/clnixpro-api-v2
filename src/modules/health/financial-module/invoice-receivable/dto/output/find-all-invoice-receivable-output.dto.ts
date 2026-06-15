import { ApiProperty } from '@nestjs/swagger';
import { FindOneInvoiceReceivableOutputDto } from './find-one-invoice-receivable-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllInvoiceReceivableOutputDto {
  @ApiProperty({ type: [FindOneInvoiceReceivableOutputDto], description: 'List of invoice receivables.' })
  data: FindOneInvoiceReceivableOutputDto[];

  @ApiProperty({ description: 'Pagination information.' })
  pageInfo: PageInfo;
}
