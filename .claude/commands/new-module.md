# ClinicXPro — Novo Módulo NestJS

Gera um módulo NestJS completo seguindo o padrão do projeto ClinicXPro.

## Como usar

```
/new-module <nome-do-modulo> <grupo> "<campos>"
```

**Exemplos:**
```
/new-module schedule health "id:uuid, accountId:uuid, patientId:uuid, status:ScheduleStatus, startAt:date, endAt:date"
/new-module supplier financial "id:uuid, accountId:uuid, name:string, email?:string, phone?:string"
```

---

## Instruções para o agente

Quando chamado, implemente um módulo NestJS completo no projeto `/Users/raidandias/Documents/developer/clinixpro-api`.

Use os argumentos `$ARGUMENTS` para extrair:
- **nome**: primeiro token (ex: `schedule`)
- **grupo**: segundo token (ex: `health`) → determina o path `src/modules/health/<nome>-module/<nome>/`
- **campos**: lista após o terceiro token → campos do model Prisma

Se `$ARGUMENTS` estiver vazio, pergunte ao usuário:
1. Nome do módulo (ex: `health-record`)
2. Grupo (health | system | financial) 
3. Campos do model Prisma (nome:tipo, ex: `patientId:uuid, description:string, status?:enum`)

---

## Estrutura a criar

```
src/modules/<grupo>/<nome>-module/<nome>/
├── <nome>.module.ts
├── <nome>.controller.ts
├── <nome>.service.ts
└── dto/
    ├── input/
    │   ├── create-<nome>-input-body.dto.ts
    │   ├── find-all-<nome>-input-query.dto.ts
    │   ├── find-one-<nome>-input-param.dto.ts
    │   ├── update-<nome>-input-param-hibrido.dto.ts
    │   └── delete-<nome>-input-param.dto.ts
    └── output/
        ├── create-<nome>-output.dto.ts
        ├── find-all-<nome>-output.dto.ts
        ├── find-one-<nome>-output.dto.ts
        ├── update-<nome>-output.dto.ts
        └── delete-<nome>-output.dto.ts
```

---

## Padrão dos arquivos

### `<nome>.controller.ts`
```typescript
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { <Nome>Service } from './<nome>.service';
import { Create<Nome>InputBodyDto } from './dto/input/create-<nome>-input-body.dto';
import { Create<Nome>OutputDto } from './dto/output/create-<nome>-output.dto';
import { FindAll<Nome>InputQueryDto } from './dto/input/find-all-<nome>-input-query.dto';
import { FindAll<Nome>OutputDto } from './dto/output/find-all-<nome>-output.dto';
import { FindOne<Nome>InputParamDto } from './dto/input/find-one-<nome>-input-param.dto';
import { FindOne<Nome>OutputDto } from './dto/output/find-one-<nome>-output.dto';
import { Update<Nome>InputBodyDto, Update<Nome>InputParamDto } from './dto/input/update-<nome>-input-param-hibrido.dto';
import { Update<Nome>OutputDto } from './dto/output/update-<nome>-output.dto';
import { Delete<Nome>InputParamDto } from './dto/input/delete-<nome>-input-param.dto';
import { Delete<Nome>OutputDto } from './dto/output/delete-<nome>-output.dto';
import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from 'src/modules/system/auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';

@ApiTags('API <Nome>')
@Controller('api/<nome>')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class <Nome>Controller {
  constructor(private readonly <nome>Service: <Nome>Service) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new <Nome>' })
  @ApiResponse({ status: 200, description: 'The <Nome> has been successfully created.', type: Create<Nome>OutputDto })
  @ApiCommonResponses()
  async create(@Body() dto: Create<Nome>InputBodyDto): Promise<Create<Nome>OutputDto> {
    return this.<nome>Service.create(dto);
  }

  @Get('/v1/find-all')
  @ApiOperation({ summary: 'Find all <Nome>' })
  @ApiResponse({ status: 200, type: FindAll<Nome>OutputDto })
  @ApiCommonResponses()
  async findAll(@Query(new ValidationPipe({ transform: true })) query: FindAll<Nome>InputQueryDto): Promise<FindAll<Nome>OutputDto> {
    return this.<nome>Service.findAll(query);
  }

  @Get('/v1/find-one/:id')
  @ApiOperation({ summary: 'Get <Nome> by ID' })
  @ApiResponse({ status: 200, type: FindOne<Nome>OutputDto })
  @ApiCommonResponses()
  async findOne(@Param(new ValidationPipe({ transform: true })) param: FindOne<Nome>InputParamDto): Promise<FindOne<Nome>OutputDto> {
    return this.<nome>Service.findOne(param);
  }

  @Patch('/v1/update/:id')
  @ApiOperation({ summary: 'Update <Nome> by ID' })
  @ApiResponse({ status: 200, type: Update<Nome>OutputDto })
  @ApiCommonResponses()
  async update(
    @Param(new ValidationPipe({ transform: true })) param: Update<Nome>InputParamDto,
    @Body() body: Update<Nome>InputBodyDto,
  ): Promise<Update<Nome>OutputDto> {
    return this.<nome>Service.update(param, body);
  }

  @Delete('/v1/delete/:id')
  @ApiOperation({ summary: 'Soft delete <Nome> by ID' })
  @ApiResponse({ status: 200, type: Delete<Nome>OutputDto })
  @ApiCommonResponses()
  async delete(@Param(new ValidationPipe({ transform: true })) param: Delete<Nome>InputParamDto): Promise<Delete<Nome>OutputDto> {
    return this.<nome>Service.delete(param);
  }
}
```

### `<nome>.service.ts`
```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';
import { getPageInfo } from 'src/share/dto/output/page-info.dto';
// import all DTOs...

@Injectable()
export class <Nome>Service {
  constructor(private prisma: PrismaService) {}

  async create(dto: Create<Nome>InputBodyDto): Promise<Create<Nome>OutputDto> {
    return this.prisma.<nome>.create({ data: dto });
  }

  async findAll(query: FindAll<Nome>InputQueryDto): Promise<FindAll<Nome>OutputDto> {
    const { page, perPage, ...filters } = query;
    const pageNumber = Number(page) || 1;
    const itemsPerPage = Number(perPage) || 10;
    const where = { ...filters, deletedAt: null };
    const [data, totalItems] = await Promise.all([
      this.prisma.<nome>.findMany({ where, skip: (pageNumber - 1) * itemsPerPage, take: itemsPerPage }),
      this.prisma.<nome>.count({ where }),
    ]);
    return { data, pageInfo: getPageInfo(totalItems, pageNumber, itemsPerPage) };
  }

  async findOne(param: FindOne<Nome>InputParamDto): Promise<FindOne<Nome>OutputDto> {
    const item = await this.prisma.<nome>.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('<Nome> not found');
    return item;
  }

  async update(param: Update<Nome>InputParamDto, body: Update<Nome>InputBodyDto): Promise<Update<Nome>OutputDto> {
    const item = await this.prisma.<nome>.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('<Nome> not found');
    return this.prisma.<nome>.update({ where: { id: param.id }, data: body });
  }

  async delete(param: Delete<Nome>InputParamDto): Promise<Delete<Nome>OutputDto> {
    const item = await this.prisma.<nome>.findUnique({ where: { id: param.id, deletedAt: null } });
    if (!item) throw new NotFoundException('<Nome> not found');
    return this.prisma.<nome>.update({ where: { id: param.id }, data: { deletedAt: new Date() } });
  }
}
```

### `<nome>.module.ts`
```typescript
import { Module } from '@nestjs/common';
import { <Nome>Service } from './<nome>.service';
import { <Nome>Controller } from './<nome>.controller';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

@Module({
  controllers: [<Nome>Controller],
  providers: [<Nome>Service, PrismaService],
  exports: [<Nome>Service],
})
export class <Nome>Module {}
```

### DTO Input — create body
```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID, IsEnum, IsNumber, IsDateString, IsBoolean } from 'class-validator';
// import enums from '@prisma/client' if needed

export class Create<Nome>InputBodyDto {
  // accountId is ALWAYS optional — injected by AccountInterceptor
  @ApiProperty({ required: false, description: 'Account identifier', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsOptional()
  @IsUUID(4)
  accountId?: string;

  // For each required field:
  @ApiProperty({ description: 'Description of the field', example: 'example value' })
  @IsNotEmpty()
  @IsString()
  fieldName: string;

  // For each optional field:
  @ApiProperty({ required: false, description: 'Description', example: 'example value', nullable: true })
  @IsOptional()
  @IsString()
  optionalField?: string;

  // For enum fields:
  @ApiProperty({ enum: MyEnum, enumName: 'MyEnum', example: 'VALUE_A', required: false })
  @IsOptional()
  @IsEnum(MyEnum)
  enumField?: MyEnum;

  // For date fields:
  @ApiProperty({ description: 'Start datetime', example: '2024-01-15T10:00:00Z' })
  @IsNotEmpty()
  @IsDateString()
  startAt: string;

  // For decimal/number fields:
  @ApiProperty({ description: 'Amount', example: 100.00 })
  @IsNotEmpty()
  @IsNumber()
  valueTotal: number;
}
```

### DTO Input — find-all query
```typescript
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsUUID, IsString, IsNumber, IsEnum } from 'class-validator';

export class FindAll<Nome>InputQueryDto {
  @ApiProperty({ required: false, description: 'Filter by account', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsOptional()
  @IsUUID(4)
  accountId?: string;

  // ... other filters (all @IsOptional)

  @ApiProperty({ required: false, description: 'Page number', example: 1 })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  page?: number;

  @ApiProperty({ required: false, description: 'Items per page', example: 10 })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  perPage?: number;
}
```

### DTO Input — find-one / delete param
```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindOne<Nome>InputParamDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Unique identifier' })
  @IsNotEmpty()
  @IsUUID(4)
  id: string;
}
```

### DTO Input — update hybrid (exports TWO classes)
```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class Update<Nome>InputParamDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID of the record to update' })
  @IsNotEmpty()
  @IsUUID(4)
  id: string;
}

export class Update<Nome>InputBodyDto {
  // All fields from the model, all @IsOptional
  @ApiProperty({ required: false, description: '...', example: '...' })
  @IsOptional()
  @IsString()
  fieldName?: string;
}
```

### DTO Output — find-one (all fields, all with example)
```typescript
import { ApiProperty } from '@nestjs/swagger';

export class FindOne<Nome>OutputDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Unique identifier' })
  id: string;

  @ApiProperty({ example: 'acc123e4-e89b-12d3-a456-426614174000', description: 'Account identifier' })
  accountId: string;

  // ... all other fields

  @ApiProperty({ example: '2024-01-15T10:00:00Z', description: 'Created timestamp' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-15T10:00:00Z', description: 'Updated timestamp' })
  updatedAt: Date;

  @ApiProperty({ example: null, nullable: true, description: 'Deleted timestamp (soft delete)' })
  deletedAt: Date | null;
}
```

### DTO Output — find-all
```typescript
import { ApiProperty } from '@nestjs/swagger';
import { PageInfo } from 'src/share/dto/output/page-info.dto';
import { FindOne<Nome>OutputDto } from './find-one-<nome>-output.dto';

export class FindAll<Nome>OutputDto {
  @ApiProperty({ type: [FindOne<Nome>OutputDto] })
  data: FindOne<Nome>OutputDto[];

  @ApiProperty()
  pageInfo: PageInfo;
}
```

---

## Após criar os arquivos

1. **Registrar em `src/app.module.ts`**: adicionar import e incluir no array `imports`
2. **Registrar em `src/main.ts`**: adicionar import e criar `setupSwagger(...)` call
3. **Gerar o SDK** (quando a API estiver rodando):
   ```bash
   # Adicionar entrada no scripts/generate-sdk.sh e no package.json
   pnpm generate-sdk --url=http://localhost:3000/docs/api/<nome>-json --folder=<nome>
   ```
4. **Integrar no front-end**:
   - Adicionar import e instância em `src/sdk/api.ts`
   - Criar módulo em `src/modules/<nome>/`

---

## Regras obrigatórias

- `@ApiProperty` com `description` E `example` em **todos** os campos
- `accountId` SEMPRE opcional no input body (AccountInterceptor injeta via header)
- `deletedAt: null` no where do findUnique/findMany para soft delete
- Modelos sem `deletedAt` no schema: não usar `deletedAt: null` nas queries
- Enums: importar de `'@prisma/client'`, usar `@IsEnum(MyEnum)` + `@ApiProperty({ enum: MyEnum, enumName: 'MyEnum' })`
- Decimais: TypeScript `number`, validador `@IsNumber()`, example `100.00`
- Datas: TypeScript `string` no input com `@IsDateString()`, `Date` no output
