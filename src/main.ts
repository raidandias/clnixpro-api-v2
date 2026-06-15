import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UsersModule } from './modules/system/user-module/users.module';
import { AuthModule } from './modules/system/auth-module/auth/auth.module';
import { AccountModule } from './modules/system/account-module/account/account.module';
import { AccountUserModule } from './modules/system/account-module/account-user/account-user.module';
import { SignupModule } from './modules/system/auth-module/signup/signup.module';
import { UserResetPasswordModule } from './modules/system/auth-module/reset-password/user-reset-password.module';
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

function setupSwagger(
  app: any,
  title: string,
  description: string,
  version: string,
  path: string,
  modules: any[],
): string {
  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    );

  if (process.env.NODE_ENV === 'homologation') {
    config.addServer('https://api.hml.clinixpro.com.br', 'Homologação');
  } else if (process.env.NODE_ENV === 'sandbox') {
    config.addServer('https://api.sandbox.clinixpro.com.br', 'Sandbox');
  } else if (process.env.NODE_ENV === 'production') {
    config.addServer('https://api.clinixpro.com.br', 'Produção');
  } else {
    config.addServer(
      `http://localhost:${process.env.PORT || 3000}`,
      'Localhost',
    );
  }

  const document = SwaggerModule.createDocument(app, config.build(), {
    include: modules,
    ignoreGlobalPrefix: true,
  });

  const swaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      // tagsSorter: 'alpha',
      // operationsSorter: 'method',
    },
    customSiteTitle: title + ' - DOCS CLINIXPRO',
  };

  SwaggerModule.setup(`docs/${path}`, app, document, swaggerCustomOptions);
  return `http://localhost:${process.env.PORT || 3000}/docs/${path}`;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS.split(','),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const swaggerUrls = [
    setupSwagger(
      app,
      'API Auth',
      'A descrição da API de autenticação',
      '1.0',
      'api/auth',
      [AuthModule, SignupModule, UserResetPasswordModule],
    ),
    setupSwagger(
      app,
      'API User',
      'A descrição da API de usuário',
      '1.0',
      'api/users',
      [UsersModule],
    ),
    setupSwagger(
      app,
      'API Account',
      'A descrição da API de conta',
      '1.0',
      'api/accounts',
      [AccountModule, AccountUserModule],
    ),
    setupSwagger(
      app,
      'API Item',
      'A descrição da API de Items',
      '1.0',
      'api/items',
      [
        ItemModule,
        ItemCatalogProductModule,
        ItemCatalogServiceModule,
        ItemStockModule,
        ItemCatalogExamModule,
        ItemHealthInsuranceModule,
        ItemInstrumentModule,
        ItemExamModule,
      ],
    ),
    setupSwagger(
      app,
      'API Health Insurance',
      'A descrição da API de Convênios',
      '1.0',
      'api/health-insurances',
      [HealthInsuranceModule],
    ),
    setupSwagger(
      app,
      'API Health Patient',
      'A descrição da API de Pacientes',
      '1.0',
      'api/health-patient',
      [PatientModule],
    ),
    setupSwagger(
      app,
      'API Professional',
      'A descrição da API de Profissionais',
      '1.0',
      'api/professionals',
      [ProfessionalModule, ProfessionalItemModule],
    ),
    setupSwagger(
      app,
      'API File',
      'A descrição da API de Arquivos',
      '1.0',
      'api/files',
      [FileModule],
    ),
    setupSwagger(
      app,
      'API Schedule',
      'Agendamentos e participantes',
      '1.0',
      'api/schedule',
      [ScheduleModule, ScheduleParticipantModule, ScheduleLogsModule],
    ),
    setupSwagger(
      app,
      'API Medical Care',
      'Prontuários e arquivos médicos',
      '1.0',
      'api/medical-care',
      [HealthMedicalCareModule, HealthMedicalCareFileModule],
    ),
    setupSwagger(
      app,
      'API Orders',
      'Pedidos, itens e pagamentos',
      '1.0',
      'api/orders',
      [
        OrderModule,
        OrderItemModule,
        OrderProfessionalModule,
        OrderProfessionalScheduleModule,
        OrderPaymentModule,
        OrderPaymentCurrencyModule,
      ],
    ),
    setupSwagger(
      app,
      'API Benefits',
      'Benefícios e planos de pacientes',
      '1.0',
      'api/benefits',
      [BenefitModule, BenefitItemModule, BenefitPatientModule],
    ),
    setupSwagger(
      app,
      'API Financial',
      'Financeiro: fornecedores, faturas e fluxo de caixa',
      '1.0',
      'api/financial',
      [
        SupplierModule,
        CustomerModule,
        InvoiceReceivableModule,
        InvoicePayableModule,
        InvoicePaymentModule,
        BalanceModule,
        StatementModule,
      ],
    ),
    setupSwagger(
      app,
      'API Dashboard',
      'Métricas e indicadores para gráficos de dashboard',
      '1.0',
      'api/dashboard',
      [DashboardModule],
    ),
  ];

  const port = process.env.PORT || 3000;
  await app.listen(port);

  const sep = '─'.repeat(60);
  console.log(`\n┌${sep}┐`);
  console.log(`│  ClinixPro API  →  http://localhost:${port}`.padEnd(61) + '│');
  console.log(`├${sep}┤`);
  console.log(`│  Swagger Docs:`.padEnd(61) + '│');
  swaggerUrls.forEach((url) => console.log(`│    ${url}`.padEnd(61) + '│'));
  console.log(`└${sep}┘\n`);
}
bootstrap();
