import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { IsValidDate } from 'src/share/utils/validators/IsValidDate';

export class CreateSignupInputBodyDto {
  @ApiProperty({ example: 'John', description: 'The user name' })
  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'The user email' })
  @IsEmail({}, { message: 'Email must be valid.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'The user password' })
  @IsString({ message: 'Password must be a string.' })
  @IsNotEmpty({ message: 'Password is required.' })
  password: string;

  @ApiProperty({ example: '123456789', description: 'The user document' })
  @IsString({ message: 'Document must be a string.' })
  @IsNotEmpty({ message: 'Document is required.' })
  document: string;

  @ApiProperty({ example: '2000-01-01', description: 'The user date of birth' })
  @IsValidDate({ message: 'Date of birth must be a valid date.' })
  @IsNotEmpty({ message: 'Date of birth is required.' })
  dateBirth: string;

  @ApiProperty({ example: 'MALE', description: 'The user gender' })
  @IsString({ message: 'Gender must be one of the allowed values.' })
  @IsNotEmpty({ message: 'Gender is required.' })
  gender: string;

  @ApiProperty({ example: 'true', description: 'The user acceptance of terms' })
  @IsNotEmpty({ message: 'Terms is required.' })
  terms: boolean;

  @ApiProperty({ example: 'true', description: 'The user acceptance of LGPD' })
  @IsNotEmpty({ message: 'LGPD is required.' })
  lgpd: boolean;

  @ApiProperty({ example: 'Company Ltd', description: 'The company name' })
  @IsString({ message: 'Company name must be a string.' })
  @IsNotEmpty({ message: 'Company name is required.' })
  companyName: string;

  @ApiProperty({ example: '987654321', description: 'The company document' })
  @IsString({ message: 'Company document must be a string.' })
  @IsNotEmpty({ message: 'Company document is required.' })
  companyDocument: string;

  @ApiProperty({
    example: 'Internet',
    description: 'How the user found the company',
  })
  @IsString({ message: 'How it was found must be a string.' })
  @IsNotEmpty({ message: 'How it was found is required.' })
  itFound: string;
}
