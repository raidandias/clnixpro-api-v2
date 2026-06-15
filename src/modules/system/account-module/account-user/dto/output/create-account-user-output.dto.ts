import { ApiProperty } from '@nestjs/swagger';
import { AccountUserStatus, AccountUserType } from '@prisma/client';

export class CreateAccountUserOutputDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The AccountUser ID',
  })
  id: string;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The associated account ID',
  })
  accountId: string;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The associated user ID',
  })
  userId: string;

  @ApiProperty({
    example: AccountUserStatus.ENABLED,
    description: 'The status of the AccountUser',
    enum: AccountUserStatus,
  })
  status: AccountUserStatus;

  @ApiProperty({
    example: AccountUserType.TEAM,
    description: 'The type of the AccountUser',
    enum: AccountUserType,
  })
  type: AccountUserType;

  @ApiProperty({
    example: 'Manager',
    description: 'The position of the AccountUser',
  })
  position: string;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The date when the AccountUser was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The date when the AccountUser was last updated',
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The date when the AccountUser was deleted',
  })
  deletedAt: Date;
}
