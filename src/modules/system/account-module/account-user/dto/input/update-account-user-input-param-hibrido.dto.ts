import { ApiProperty } from '@nestjs/swagger';
import { AccountUserStatus, AccountUserType } from '@prisma/client';

import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class UpdateAccountUserInputParamDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsString({ message: 'The Id field must be a string' })
  @IsNotEmpty({ message: 'The Id field must not be empty' })
  @IsUUID(4, { message: 'The Id field must be a valid UUIDv4' })
  id: string;
}

export class UpdateAccountUserInputBodyDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The associated account ID',
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsNotEmpty({ message: 'Account ID is required.' })
  accountId: string;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The associated user ID',
  })
  @IsString({ message: 'User ID must be a string.' })
  @IsNotEmpty({ message: 'User ID is required.' })
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
  @IsNotEmpty({ message: 'Position is required.' })
  position: string;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The date when the AccountUser was created',
  })
  @IsString({ message: 'Created at must be a valid date.' })
  createdAt: string;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The date when the AccountUser was last updated',
  })
  @IsString({ message: 'Updated at must be a valid date.' })
  updatedAt: string;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The date when the AccountUser was deleted',
  })
  @IsString({ message: 'Deleted at must be a valid date.' })
  @IsOptional()
  deletedAt?: string;
}
