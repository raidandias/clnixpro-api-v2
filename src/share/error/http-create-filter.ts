import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ResponseStatusInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    const request = context.switchToHttp().getRequest();

    const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

    const origin = request.headers.origin;
    console.log('ORIGIN ATUAL >>> OK 111111111111', origin);
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
      response.status(200).end();
      return of(null); // Retornar um Observable que emite null e completa
    }

    return next.handle().pipe(
      tap(() => {
        if (response.statusCode === 201) {
          response.status(200);
        }
      }),
    );
  }
}
