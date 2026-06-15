import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { FindOneUserOutputDto } from 'src/modules/system/user-module/dto/output/find-one-user-output.dto';

export class FindOneProfessionalOutputDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the professional',
  })
  id: string;

  @ApiProperty({
    example: '98765432-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the associated user',
  })
  userId: string;

  @ApiProperty({
    example: 'acc123e4-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the associated account',
  })
  accountId: string;

  @ApiProperty({
    example: 'Doctor',
    description: 'Professional occupation or specialization',
  })
  ocupation: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Timestamp of when the professional was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-02T00:00:00Z',
    description: 'Timestamp of the last update to the professional',
  })
  updatedAt: Date;

  @ApiProperty({
    example: null,
    nullable: true,
    description:
      'Timestamp of when the professional was deleted, if applicable',
  })
  deletedAt: Date | null;

  @ApiProperty({
    type: () => FindOneUserOutputDto,
    description: 'Detailed information about the associated user',
  })
  user: Partial<FindOneUserOutputDto>;
}
