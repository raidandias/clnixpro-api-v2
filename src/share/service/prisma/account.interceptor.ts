// src/common/interceptors/account.interceptor.ts

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from './prisma.service';

@Injectable()
export class AccountInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  // Defina os modelos que possuem o campo accountId
  private readonly modelsWithAccountId = [
    'AccountUser',
    'Item',
    'ItemCatalog',
    'ItemStock',
    'HealthInsurance',
    'ItemHealthInsurance',
    'ItemInstrument',
    'ItemExam',
    'Patient',
    'Professional',
    'ProfessionalItem',
  ];

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const payload = request.user;
    const accountId = payload?.account?.id;

    if (accountId) {
      this.prisma.$use(async (params, next) => {
        if (this.modelsWithAccountId.includes(params.model)) {
          if (params.action === 'create' || params.action === 'update') {
            console.log('params', params);
            // Substitui o accountId no data para operações de criação
            if (params?.args?.data) {
              params.args.data.accountId = accountId;
            }

            if (params?.args?.where && params.action === 'update') {
              params.args.where = {
                ...params.args.where,
                accountId: accountId,
              };
            }
          } else {
            // Adiciona o accountId ao where das queries para outras operações
            if (params?.args?.where) {
              params.args.where = {
                ...params.args.where,
                accountId: accountId,
              };
            } else {
              params.args.where = {
                accountId: accountId,
              };
            }
          }
        }

        return next(params);
      });
    }

    return next.handle().pipe();
  }
}
