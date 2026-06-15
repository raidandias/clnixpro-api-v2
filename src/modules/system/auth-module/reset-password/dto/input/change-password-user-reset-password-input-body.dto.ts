import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class ChangePasswordUserResetPasswordInputBodyDto {
  @ApiProperty({
    example: 'jonh@example.com',
    description: 'Email for send token reset request.',
  })
  @IsString({ message: 'Email must be a string.' })
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Email must be a valid email.' })
  email: string;

  @ApiProperty({
    example: 'oeieij9833j9j',
    description: 'New password for user.',
  })
  @IsString({ message: 'Password must be a string.' })
  @IsNotEmpty({ message: 'Password is required.' })
  newPassword: string;

  @ApiProperty({
    example: 'oeieij9833j9j',
    description: 'New password for user.',
  })
  @IsString({ message: 'New password must be a string.' })
  @IsNotEmpty({ message: 'New password is required.' })
  newPasswordConfirmation: string;
}
