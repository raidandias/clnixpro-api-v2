import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty, IsOptional } from 'class-validator';

export class RefreshAuthInputBodyDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    description: 'JWT refresh_token',
  })
  @IsNotEmpty({ message: 'JWT is required.' })
  refresh_token: string;

  @ApiProperty({
    example: 'f1b9b1b0-0b3b-4b3b-8b3b-0b3b3b3b3b3b',
    description: 'Account ID',
  })
  @IsOptional()
  accountId?: string;
}
