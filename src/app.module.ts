import { forwardRef, Module } from '@nestjs/common';
import { APP_PIPE, APP_FILTER, Reflector, APP_INTERCEPTOR } from '@nestjs/core';
import { UsersModule } from './modules/system/user-module/users.module';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  I18nService,
  QueryResolver,
} from 'nestjs-i18n';
import * as path from 'path';
import { CustomValidationPipe } from './share/error/custom-validation-pipe';
import { HttpExceptionFilter } from './share/error/http-exception-filter';
import { PrismaModule } from './share/service/prisma/prisma.module';
import { UploadModule } from './share/service/aws/s3/upload.module';
import { HealthController } from './app.controller';
import { AuthModule } from './modules/system/auth-module/auth/auth.module';
import { AccountModule } from './modules/system/account-module/account/account.module';
import { AccountUserModule } from './modules/system/account-module/account-user/account-user.module';
import { SignupModule } from './modules/system/auth-module/signup/signup.module';
import { UserResetPasswordModule } from './modules/system/auth-module/reset-password/user-reset-password.module';
import { ResponseStatusInterceptor } from './share/error/http-create-filter';
import { ItemModule } from './modules/health/item-module/item/item.module';
import { ItemCatalogProductModule } from './modules/health/item-module/item-catalog-product/item-catalog-product.module';
import { ItemCatalogServiceModule } from './modules/health/item-module/item-catalog-service/item-catalog-service.module';
import { ItemStockModule } from './modules/health/item-module/item-stock/item-stock.module';
import { HealthInsuranceModule } from './modules/health/health-insurance/health-insurance.module';
import { ItemHealthInsuranceModule } from './modules/health/item-module/item-health-insurance/item-health-insurance.module';
import { ItemCatalogExamModule } from './modules/health/item-module/item-catalog-exam/item-catalog-exam.module';
import { ItemInstrumentModule } from './modules/health/item-module/item-instrument/item-instrument.module';
import { ItemExamModule } from './modules/health/item-module/item-exam/item-exam.module';
import { PatientModule } from './modules/health/patient-module/patient.module';
import { FileModule } from './modules/system/file-module/file.module';
import { ProfessionalItemModule } from './modules/health/professional-module/professional-item/professional-item.module';
import { ProfessionalModule } from './modules/health/professional-module/professional/professional.module';
import { ScheduleModule } from './modules/health/schedule-module/schedule/schedule.module';
import { ScheduleParticipantModule } from './modules/health/schedule-module/schedule-participant/schedule-participant.module';
import { ScheduleLogsModule } from './modules/health/schedule-module/schedule-logs/schedule-logs.module';
import { HealthMedicalCareModule } from './modules/health/medical-care-module/health-medical-care/health-medical-care.module';
import { HealthMedicalCareFileModule } from './modules/health/medical-care-module/health-medical-care-file/health-medical-care-file.module';
import { OrderModule } from './modules/health/order-module/order/order.module';
import { OrderItemModule } from './modules/health/order-module/order-item/order-item.module';
import { OrderProfessionalModule } from './modules/health/order-module/order-professional/order-professional.module';
import { OrderProfessionalScheduleModule } from './modules/health/order-module/order-professional-schedule/order-professional-schedule.module';
import { OrderPaymentModule } from './modules/health/order-module/order-payment/order-payment.module';
import { OrderPaymentCurrencyModule } from './modules/health/order-module/order-payment-currency/order-payment-currency.module';
import { BenefitModule } from './modules/health/benefit-module/benefit/benefit.module';
import { BenefitItemModule } from './modules/health/benefit-module/benefit-item/benefit-item.module';
import { BenefitPatientModule } from './modules/health/benefit-module/benefit-patient/benefit-patient.module';
import { SupplierModule } from './modules/health/financial-module/supplier/supplier.module';
import { CustomerModule } from './modules/health/financial-module/customer/customer.module';
import { InvoiceReceivableModule } from './modules/health/financial-module/invoice-receivable/invoice-receivable.module';
import { InvoicePayableModule } from './modules/health/financial-module/invoice-payable/invoice-payable.module';
import { InvoicePaymentModule } from './modules/health/financial-module/invoice-payment/invoice-payment.module';
import { BalanceModule } from './modules/health/financial-module/balance/balance.module';
import { StatementModule } from './modules/health/financial-module/statement/statement.module';
import { DashboardModule } from './modules/health/dashboard-module/dashboard/dashboard.module';

@Module({
  controllers: [HealthController],
  imports: [
    PrismaModule,
    AuthModule,
    forwardRef(() => AccountUserModule),
    forwardRef(() => UsersModule),
    UserResetPasswordModule,
    AccountModule,
    SignupModule,
    ItemModule,
    ItemCatalogProductModule,
    ItemCatalogServiceModule,
    ItemCatalogExamModule,
    ItemStockModule,
    ItemHealthInsuranceModule,
    ItemInstrumentModule,
    ItemExamModule,
    HealthInsuranceModule,
    PatientModule,
    ProfessionalModule,
    ProfessionalItemModule,
    FileModule,
    UploadModule,
    ScheduleModule,
    ScheduleParticipantModule,
    ScheduleLogsModule,
    HealthMedicalCareModule,
    HealthMedicalCareFileModule,
    OrderModule,
    OrderItemModule,
    OrderProfessionalModule,
    OrderProfessionalScheduleModule,
    OrderPaymentModule,
    OrderPaymentCurrencyModule,
    BenefitModule,
    BenefitItemModule,
    BenefitPatientModule,
    SupplierModule,
    CustomerModule,
    InvoiceReceivableModule,
    InvoicePayableModule,
    InvoicePaymentModule,
    BalanceModule,
    StatementModule,
    DashboardModule,
    I18nModule.forRoot({
      fallbackLanguage: 'pt-br',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: (i18nService: I18nService) =>
        new CustomValidationPipe(i18nService),
      inject: [I18nService],
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseStatusInterceptor,
    },
    Reflector,
  ],
})
export class AppModule {}
