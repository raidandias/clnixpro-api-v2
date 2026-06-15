import { PartialType } from '@nestjs/swagger';
import { LoginAuthOutputDto } from './login-auth-output.dto';

export class RefreshAuthOutputDto extends PartialType(LoginAuthOutputDto) {}
