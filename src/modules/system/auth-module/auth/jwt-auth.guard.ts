import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { FindAllAccountUserInputQueryDto } from '../../account-module/account-user/dto/input/find-all-account-user-input-query.dto';
import { AccountUserStatus } from '@prisma/client';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = (await super.canActivate(context)) as boolean;

    if (!canActivate) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const payload = request.user;

    if (payload) {
      //@ts-ignore
      const result: FindAllAccountUserInputQueryDto = {
        userId: payload.user.id,
        accountId: payload.account.id,
        status: AccountUserStatus.ENABLED,
      };

      const accountUser = await this.prisma.accountUser.findFirst({
        where: result,
      });

      if (!accountUser) {
        throw new UnauthorizedException("You don't have permission");
      }
    } else {
      throw new UnauthorizedException("You don't have permission");
    }

    return true;
  }

  handleRequest(err: any, payload: any, info: any) {
    if (err || !payload) {
      throw err || new UnauthorizedException("You don't have permission");
    }

    return payload;
  }
}
