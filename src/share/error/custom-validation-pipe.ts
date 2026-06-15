import {
  ValidationPipe,
  ValidationError,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

export class CustomValidationPipe extends ValidationPipe {
  constructor(private readonly i18n: I18nService) {
    super({
      transform: true,
      exceptionFactory: async (errors: ValidationError[]) => {
        const messages = {};
        for (const err of errors) {
          messages[err.property] = messages[err.property] || [];
          for (const key in err.constraints) {
            const translatedMessage = await this.i18n.translate(
              `validation.${err.constraints[key]}`,
              {
                args: { property: err.property, value: err.value },
              },
            );
            messages[err.property].push(translatedMessage);
          }
        }

        return new HttpException(
          {
            fields: messages,
          },
          HttpStatus.BAD_REQUEST,
        );
      },
    });
  }
}
