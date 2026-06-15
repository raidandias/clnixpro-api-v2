import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordUserResetPasswordOutputDto {
  @ApiProperty({
    example: 'Code verify success',
    description: 'Code verify success',
  })
  message: string;

  @ApiProperty({
    example: 'true',
    description: 'Code verify success',
  })
  status: boolean;
}
