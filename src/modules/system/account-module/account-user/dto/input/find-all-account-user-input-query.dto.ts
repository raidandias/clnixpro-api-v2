import { ApiProperty } from '@nestjs/swagger';
import { AccountUserStatus, AccountUserType } from '@prisma/client';
import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class FindAllAccountUserInputQueryDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The AccountUser ID',
    required: false,
  })
  @IsString({ message: 'ID must be a string.' })
  @IsNotEmpty({ message: 'ID is required.' })
  @IsUUID(4, { message: 'ID must be a valid UUID.' })
  @IsOptional()
  id?: string;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The associated user ID',
    required: false,
  })
  @IsString({ message: 'User ID must be a string.' })
  @IsNotEmpty({ message: 'User ID is required.' })
  @IsUUID(4, { message: 'User ID must be a valid UUID.' })
  @IsOptional()
  userId: string;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The associated user ID',
    required: false,
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsNotEmpty({ message: 'Account ID is required.' })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  @IsOptional()
  accountId: string;

  @ApiProperty({
    example: AccountUserStatus.ENABLED,
    description: 'The status of the AccountUser',
    required: false,
  })
  @IsString({ message: 'Status must be one of the allowed values.' })
  @IsOptional()
  status?: AccountUserStatus;

  @ApiProperty({
    example: AccountUserType.TEAM,
    description: 'The type of the AccountUser',
    required: false,
  })
  @IsString({ message: 'Type must be one of the allowed values.' })
  @IsOptional()
  type?: AccountUserType;

  @ApiProperty({
    example: 'Manager',
    description: 'The position of the AccountUser',
    required: false,
  })
  @IsString({ message: 'Position must be a string.' })
  @IsNotEmpty({ message: 'Position is required.' })
  @IsOptional()
  position?: string;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The date when the AccountUser was created',
    required: false,
  })
  @IsString({ message: 'Created at must be a valid date.' })
  @IsOptional()
  createdAt?: string;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The date when the AccountUser was last updated',
    required: false,
  })
  @IsString({ message: 'Updated at must be a valid date.' })
  @IsOptional()
  updatedAt?: string;

  @ApiProperty({ example: '1', description: 'Page actual', required: true })
  @IsString({ message: 'Page must be a string.' })
  @IsNotEmpty({ message: 'Page is required.' })
  page: string;

  @ApiProperty({
    example: '20',
    description: 'Quantity itens per page',
    required: true,
  })
  @IsString({ message: 'Per page must be a string.' })
  @IsNotEmpty({ message: 'Per page is required.' })
  perPage?: string;
}
