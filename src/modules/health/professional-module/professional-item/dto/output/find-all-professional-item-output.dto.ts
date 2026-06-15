import { ApiProperty } from '@nestjs/swagger';

import { CreateProfessionalItemOutputDto } from './create-professional-item-output.dto';
import { PageInfo } from 'src/share/dto/output/page-info.dto';

export class FindAllProfessionalItemOutputDto {
  @ApiProperty({
    description: 'Lista de itens do profissional',
    type: () => [CreateProfessionalItemOutputDto],
  })
  data: CreateProfessionalItemOutputDto[];

  @ApiProperty()
  pageInfo: PageInfo;
}
