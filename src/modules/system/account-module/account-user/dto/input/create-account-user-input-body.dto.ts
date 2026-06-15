import { ApiProperty } from '@nestjs/swagger';
import { AccountUserStatus, AccountUserType } from '@prisma/client';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateAccountUserInputBodyDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The associated account ID',
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsNotEmpty({ message: 'Account ID is required.' })
  @IsUUID(4, { message: 'Account ID must be a valid UUIDv4.' })
  accountId: string;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The associated user ID',
  })
  @IsString({ message: 'User ID must be a string.' })
  @IsNotEmpty({ message: 'User ID is required.' })
  @IsUUID(4, { message: 'User ID must be a valid UUIDv4.' })
  userId: string;

  @ApiProperty({
    example: AccountUserStatus.ENABLED,
    description: 'The status of the AccountUser',
  })
  @IsString({ message: 'Status must be one of the allowed values.' })
  status: AccountUserStatus;

  @ApiProperty({
    example: AccountUserType.TEAM,
    description: 'The type of the AccountUser',
  })
  @IsString({ message: 'Type must be one of the allowed values.' })
  type: AccountUserType;

  @ApiProperty({
    example: 'Manager',
    description: 'The position of the AccountUser',
  })
  @IsString({ message: 'Position must be a string.' })
  position: string;
}
