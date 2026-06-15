import { ApiProperty } from '@nestjs/swagger';
import { FindOneInvoicePaymentOutputDto } from './find-one-invoice-payment-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllInvoicePaymentOutputDto {
  @ApiProperty({ type: [FindOneInvoicePaymentOutputDto], description: 'List of invoice payments.' })
  data: FindOneInvoicePaymentOutputDto[];

  @ApiProperty({ description: 'Pagination information.' })
  pageInfo: PageInfo;
}
