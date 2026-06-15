import { ApiProperty, PartialType } from '@nestjs/swagger';
import { FindOneUserOutputDto } from './find-one-user-output.dto';

export class FindOneEmailUserOutputDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The user ID',
  })
  id: string;

  @ApiProperty({ example: 'John Doe', description: 'The user name' })
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The user email',
  })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The user email',
  })
  password: string;

  @ApiProperty({
    example: 'http://example.com/photo.jpg',
    description: 'The user photo',
  })
  photo?: string;

  @ApiProperty({
    example: '55',
    description: 'The user phone country code',
  })
  countryCodePhone?: string;

  @ApiProperty({
    example: '11',
    description: 'The user phone area code',
  })
  areaCodePhone?: string;

  @ApiProperty({
    example: '987654321',
    description: 'The user phone number',
  })
  phoneNumber?: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'The user date of birth',
  })
  dateOfBirth?: string;

  @ApiProperty({ example: 'ENABLE', description: 'The user status' })
  userStatus: string;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The user creation date',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The user update date',
  })
  updatedAt: Date;
}
