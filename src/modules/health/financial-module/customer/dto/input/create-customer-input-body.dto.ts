import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateCustomerInputBodyDto {
  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the customer.',
    required: false,
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: 'b2c3d4e5-6789-01bc-defa-234567890abc',
    description: 'The user associated with the customer.',
  })
  @IsString({ message: 'User ID must be a string.' })
  @IsUUID(4, { message: 'User ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'User ID is required.' })
  userId: string;
}
