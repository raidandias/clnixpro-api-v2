// mail.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Mailgun, { MessagesSendResult } from 'mailgun.js';
import * as formData from 'form-data';
import { IMailgunClient } from 'mailgun.js/Interfaces';
import { createReadStream } from 'fs'; // Import the createReadStream function from the 'fs' module

@Injectable()
export class MailService {
  private mailgun: IMailgunClient;

  constructor(private configService: ConfigService) {
    this.mailgun = new Mailgun(formData).client({
      username: 'api',
      key: this.configService.get<string>('MAILGUN_API_KEY'), // Corrigido para pegar a chave corretamente
    });
  }

  async sendEmail(
    to: string[],
    subject: string,
    text: string,
    html: string,
    attachment?: string[], // Corrigido para utilizar anexos corretamente
  ): Promise<MessagesSendResult> {
    const domain = this.configService.get<string>('MAILGUN_DOMAIN'); // Certifique-se de que isso está definido no .env
    const nameApp = this.configService.get<string>('APP_NAME'); // Certifique-se de que isso está definido no .env
    return this.mailgun.messages.create(domain, {
      from: `${nameApp} <mailgun@${domain}>`,
      to,
      subject,
      text,
      html,
      attachment: attachment
        ? attachment.map((file) => ({
            filename: file,
            data: createReadStream(file),
          }))
        : undefined,
    });
  }
}
