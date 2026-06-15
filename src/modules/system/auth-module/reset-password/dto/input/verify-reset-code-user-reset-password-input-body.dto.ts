import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class VerifyResetCodelUserResetPasswordInputBodyDto {
  @ApiProperty({
    example: 'jonh@example.com',
    description: 'Email for send token reset request.',
  })
  @IsString({ message: 'Email must be a string.' })
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Email must be a valid email.' })
  email: string;

  @ApiProperty({
    example: '09T8YU',
    description: 'Code for reset password.',
  })
  @IsString({ message: 'Code must be a string.' })
  @IsNotEmpty({ message: 'Code is required.' })
  code: string;
}
