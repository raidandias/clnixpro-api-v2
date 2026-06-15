import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

import { UsersService } from '../../user-module/users.service';
import { MailService } from 'src/share/service/mailgun/mail.service';
import { UserResetPasswordStatus } from '@prisma/client';

import { SendResetCodeUserResetPasswordOutputDto } from './dto/output/send-reset-code-user-reset-password-output.dto';
import { VerifyResetCodeUserResetPasswordOutputDto } from './dto/output/verify-reset-code-user-reset-password-output.dto';
import { ChangePasswordUserResetPasswordOutputDto } from './dto/output/change-password-user-reset-password-output.dto';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class UserResetPasswordService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private mailService: MailService,
    private i18n: I18nService,
  ) {}

  async sendResetCode({
    email,
  }): Promise<SendResetCodeUserResetPasswordOutputDto> {
    const user = await this.usersService.findOneEmail({ email });
    if (!user) {
      const message = this.i18n.t('errors.Email send sucess.');
      return { message, status: true };
    }

    await this.prisma.userResetPassword.updateMany({
      data: { status: UserResetPasswordStatus.FINALLY },
      where: { userId: user.id },
    });

    const resetCode = Math.floor(1000 + Math.random() * 9000);
    const expiration = new Date(Date.now() + 60000);

    await this.mailService.sendEmail(
      [user.email],
      `Código de verificação - ${resetCode}`,
      `Seu código para resetar senha é ${resetCode}`,
      `Seu código para resetar senha é <b>${resetCode}</b>`,
    );

    await this.prisma.userResetPassword.create({
      data: {
        userId: user.id,
        token: resetCode.toString(),
        expiresAt: expiration,
        status: UserResetPasswordStatus.SEND,
      },
    });

    const message = this.i18n.t('errors.Email send sucess.');

    return { message, status: true };
  }

  async verifyResetCode({
    email,
    code,
  }): Promise<VerifyResetCodeUserResetPasswordOutputDto> {
    const user = await this.usersService.findOneEmail({ email });
    const message = this.i18n.t('errors.Code verify with success');
    if (!user) {
      return { message, status: false };
    }

    // Cria uma nova data que é o momento atual menos 10 minutos
    const currentTimeMinusTenMinutes = new Date();
    currentTimeMinusTenMinutes.setMinutes(
      currentTimeMinusTenMinutes.getMinutes() - 10,
    );

    const reset = await this.prisma.userResetPassword.findFirst({
      where: {
        userId: user.id,
        token: code,
        status: UserResetPasswordStatus.SEND,
        expiresAt: { gt: currentTimeMinusTenMinutes },
      },
    });

    if (!reset) {
      return { message, status: false };
    }

    await this.prisma.userResetPassword.update({
      data: { status: UserResetPasswordStatus.VERIFY },
      where: { id: reset.id },
    });

    return { message, status: true };
  }

  async changePassword({
    email,
    newPassword,
    newPasswordConfirmation,
  }): Promise<ChangePasswordUserResetPasswordOutputDto> {
    if (newPassword !== newPasswordConfirmation) {
      const message = this.i18n.t(
        'errors.Password confirmation does not match',
      );
      throw new NotFoundException(message);
    }

    const user = await this.usersService.findOneEmail({ email });
    if (!user) {
      const message = this.i18n.t('errors.Password confirmation with sucess');
      return { message, status: false };
    }

    const reset = await this.prisma.userResetPassword.findFirst({
      where: {
        userId: user.id,
        status: UserResetPasswordStatus.VERIFY,
        expiresAt: { gte: new Date() },
      },
    });

    if (!reset) {
      const message = this.i18n.t('errors.Code is expired or invalid');
      throw new NotFoundException(message);
    }

    await this.usersService.changePassword({
      email,
      newPassword,
      newPasswordConfirmation,
    });

    await this.prisma.userResetPassword.update({
      data: { status: UserResetPasswordStatus.FINALLY },
      where: { id: reset.id },
    });

    const message = this.i18n.t('errors.Password confirmation with sucess');
    return { message, status: true };
  }
}
