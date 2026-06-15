import { ApiProperty } from '@nestjs/swagger';
import { CreateUserOutputDto } from 'src/modules/system/user-module/dto/output/create-user-output.dto';

export class FindOnePatientOutputDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The unique identifier for the patient',
  })
  id: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'The ID of the associated user',
  })
  userId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440002',
    description: 'The ID of the associated account',
  })
  accountId: string;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The creation date of the patient record',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The last update date of the patient record',
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The deletion date of the patient record',
  })
  deletedAt: Date;

  @ApiProperty({ type: CreateUserOutputDto, description: 'User' })
  user?: CreateUserOutputDto;
}
