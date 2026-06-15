import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { FindOneUserOutputDto } from 'src/modules/system/user-module/dto/output/find-one-user-output.dto';

export class CreateProfessionalOutputDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  accountId: string;

  @ApiProperty()
  ocupation: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date | null;

  @ApiProperty({
    type: () => FindOneUserOutputDto,
    description: 'Detailed information about the associated user',
  })
  user: Partial<FindOneUserOutputDto>;
}
