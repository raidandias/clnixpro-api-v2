import { ApiProperty } from '@nestjs/swagger';

export class CreateSignupOutputDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The signup ID',
  })
  id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The user name',
  })
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The user email',
  })
  email: string;

  @ApiProperty({
    example: '123456789',
    description: 'The user document',
  })
  document: string;

  @ApiProperty({
    example: '2000-01-01',
    description: 'The user date of birth',
  })
  dateBirth: string;

  @ApiProperty({
    example: 'MALE',
    description: 'The user gender',
  })
  gender: string;

  @ApiProperty({
    example: 'true',
    description: 'The user acceptance of terms',
  })
  terms: boolean;

  @ApiProperty({
    example: 'true',
    description: 'The user acceptance of LGPD',
  })
  lgpd: boolean;

  @ApiProperty({
    example: 'Company Ltd',
    description: 'The company name',
  })
  companyName: string;

  @ApiProperty({
    example: '987654321',
    description: 'The company document',
  })
  companyDocument: string;

  @ApiProperty({
    example: 'Internet',
    description: 'How the user found the company',
  })
  itFound: string;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The signup creation date',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The signup update date',
  })
  updatedAt: Date;
}
