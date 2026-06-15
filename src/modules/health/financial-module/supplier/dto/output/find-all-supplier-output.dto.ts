import { ApiProperty } from '@nestjs/swagger';
import { FindOneSupplierOutputDto } from './find-one-supplier-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllSupplierOutputDto {
  @ApiProperty({ type: [FindOneSupplierOutputDto], description: 'List of suppliers.' })
  data: FindOneSupplierOutputDto[];

  @ApiProperty({ description: 'Pagination information.' })
  pageInfo: PageInfo;
}
