import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: any;

    console.log('Exception caught:', exception);

    if (exception instanceof HttpException) {
      const responseMessage = exception.getResponse();
      const lang = request.headers['accept-language'] || 'pt-br';

      message = responseMessage;
      try {
        if (typeof responseMessage === 'string') {
          message = this.i18n.translate(`errors.${responseMessage}`, { lang });
        } else if (
          typeof responseMessage === 'object' &&
          responseMessage['message']
        ) {
          const msg = responseMessage['message'];
          if (typeof msg === 'string') {
            message = this.i18n.translate(`errors.${msg}`, { lang });
          } else if (Array.isArray(msg)) {
            message = await Promise.all(
              msg.map((m) => this.i18n.translate(`errors.${m}`, { lang })),
            ).then((messages) => messages.join(', '));
          }
        }
      } catch (translationError) {
        console.error('Error translating message:', translationError);
        message = responseMessage;
      }
    } else {
      console.log('Non-HTTP exception:', exception);
      message = this.i18n.translate('errors.Internal Server Error', {
        lang: request.headers['accept-language'] || 'pt-br',
      });
    }

    const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

    const origin = request.headers.origin;
    console.log('Request origin:', origin);
    if (allowedOrigins.includes(origin)) {
      response.header('Access-Control-Allow-Origin', origin);
      response.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE',
      );
      response.header('Access-Control-Allow-Credentials', 'true');
      response.header(
        'Access-Control-Allow-Headers',
        'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type',
      );
    }

    if (request.method === 'OPTIONS') {
      response.status(204).end();
      return;
    }

    // Remove 'errors.' do início da mensagem, se presente
    const formattedMessage =
      typeof message === 'string'
        ? message.replace(/^errors\.|^validation\./, '')
        : message;

    response.status(status).json({
      error:
        typeof message === 'string'
          ? { message: formattedMessage }
          : formattedMessage,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
