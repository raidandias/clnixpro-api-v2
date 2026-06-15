import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';
import { CreateProfessionalItemInputBodyDto } from './dto/input/create-professional-item-input-body.dto';
import { FindAllProfessionalItemInputQueryDto } from './dto/input/find-all-professional-item-input-query.dto';
import { UpdateProfessionalItemInputBodyDto } from './dto/input/update-professional-item-input-body.dto';
import { CreateProfessionalItemOutputDto } from './dto/output/create-professional-item-output.dto';
import { FindAllProfessionalItemOutputDto } from './dto/output/find-all-professional-item-output.dto';
import { FindOneProfessionalItemOutputDto } from './dto/output/find-one-professional-item-output.dto';
import { UpdateProfessionalItemOutputDto } from './dto/output/update-professional-item-output.dto';
import { Decimal } from '@prisma/client/runtime/library';
import { FindOneItemCatalogServiceOutputDto } from '../../item-module/item-catalog-service/dto/output/find-one-item-catalog-service-output.dto';
import { getPageInfo } from 'src/share/dto/output/page-info.dto';

@Injectable()
export class ProfessionalItemService {
  constructor(private readonly prisma: PrismaService) {}

  private mapItemCatalog(itemCatalog: any): FindOneItemCatalogServiceOutputDto {
    if (!itemCatalog) return null;

    const {
      itemInstrumentsProduct,
      itemExamsExams,
      item,
      itemHealthInsurances,
      ...rest
    } = itemCatalog;

    return {
      ...rest,
      item,
      itemInstruments:
        itemInstrumentsProduct?.map((instrument) => ({
          id: instrument.id,
          itemId: instrument.itemId,
          accountId: instrument.accountId,
          name: instrument.name,
          title: instrument.title,
          description: instrument.description,
          price: instrument.price,
          costPrice: instrument.costPrice,
          flagBenefit: instrument.flagBenefit,
          duration: instrument.duration,
          bodyMembers: instrument.bodyMembers,
          observationForProfessional: instrument.observationForProfessional,
          observationForPatient: instrument.observationForPatient,
          createdAt: instrument.createdAt,
          updatedAt: instrument.updatedAt,
          deletedAt: instrument.deletedAt,
          item: instrument.item,
          itemHealthInsurances: instrument.itemHealthInsurances,
        })) || [],
      itemExams:
        itemExamsExams?.map((exam) => ({
          id: exam.id,
          itemId: exam.itemId,
          accountId: exam.accountId,
          name: exam.name,
          title: exam.title,
          description: exam.description,
          price: exam.price,
          costPrice: exam.costPrice,
          flagBenefit: exam.flagBenefit,
          duration: exam.duration,
          bodyMembers: exam.bodyMembers,
          typeExam: exam.typeExam,
          protocol: exam.protocol,
          indications: exam.indications,
          observationForProfessional: exam.observationForProfessional,
          observationForPatient: exam.observationForPatient,
          createdAt: exam.createdAt,
          updatedAt: exam.updatedAt,
          deletedAt: exam.deletedAt,
          item: exam.item,
          itemHealthInsurances: exam.itemHealthInsurances,
        })) || [],
    };
  }

  private mapCreateProfessionalItem(
    professionalItem: any,
  ): CreateProfessionalItemOutputDto {
    const {
      itemCatalog,
      valuePayment,
      percentageValue,
      updatedAt,
      deletedAt,
      ...rest
    } = professionalItem;

    return {
      ...rest,
      valuePayment:
        valuePayment instanceof Decimal
          ? valuePayment.toString()
          : valuePayment,
      percentageValue:
        percentageValue instanceof Decimal
          ? percentageValue.toString()
          : percentageValue,
      itemCatalogs: itemCatalog
        ? [this.mapItemCatalog(itemCatalog)]
        : undefined,
    };
  }

  private mapFindOneProfessionalItem(
    professionalItem: any,
  ): FindOneProfessionalItemOutputDto {
    const { itemCatalog, valuePayment, percentageValue, ...rest } =
      professionalItem;

    return {
      ...rest,
      valuePayment:
        valuePayment instanceof Decimal
          ? valuePayment.toString()
          : valuePayment,
      percentageValue:
        percentageValue instanceof Decimal
          ? percentageValue.toString()
          : percentageValue,
      itemCatalogs: itemCatalog
        ? [this.mapItemCatalog(itemCatalog)]
        : undefined,
    };
  }

  private adjustPaymentValues(
    formOfPayment: any,
    valuePayment?: string | null,
    percentageValue?: string | null,
  ): { valuePayment: string; percentageValue: string } {
    if (formOfPayment === 'FIXED') {
      return {
        valuePayment:
          valuePayment && Number(valuePayment) > 0 ? valuePayment : '0',
        percentageValue: '0',
      };
    } else {
      // FormOfPayment.PERCENTAGE
      const adjustedPercentage = percentageValue
        ? Math.min(Math.max(Number(percentageValue), 0), 100)
        : 0;
      return {
        valuePayment: '0',
        percentageValue: adjustedPercentage.toString(),
      };
    }
  }

  async create(
    data: CreateProfessionalItemInputBodyDto,
  ): Promise<CreateProfessionalItemOutputDto> {
    // Verifica se já existe um item com a mesma combinação
    const existingItem = await this.prisma.professionalItem.findFirst({
      where: {
        professionalId: data.professionalId,
        deletedAt: null,
        itemId: data.itemId,
        itemCatalogId: data.itemCatalogId,
      },
      include: {
        itemCatalog: {
          include: {
            item: true,
            itemHealthInsurances: true,
          },
        },
      },
    });

    // Se encontrar um item existente, retorna ele
    if (existingItem) {
      return this.mapCreateProfessionalItem(existingItem);
    }

    // Se não encontrar, cria um novo
    const adjustedValues = this.adjustPaymentValues(
      data.formOfPayment,
      data.valuePayment?.toString(),
      data.percentageValue?.toString(),
    );

    const professionalItem = await this.prisma.professionalItem.create({
      data: {
        professionalId: data.professionalId,
        itemId: data.itemId,
        itemCatalogId: data.itemCatalogId,
        formOfPayment: data.formOfPayment,
        paymentAt: new Date(data.paymentAt),
        valuePayment: new Decimal(adjustedValues.valuePayment),
        percentageValue: new Decimal(adjustedValues.percentageValue),
        ...(data.accountId && { accountId: data.accountId }),
      },
      include: {
        itemCatalog: {
          include: {
            item: true,
            itemHealthInsurances: true,
          },
        },
      },
    });

    return this.mapCreateProfessionalItem(professionalItem);
  }

  async findAll(
    query: FindAllProfessionalItemInputQueryDto,
  ): Promise<FindAllProfessionalItemOutputDto> {
    const {
      pageNumber,
      perPage,
      professionalId,
      itemId,
      itemCatalogId,
      formOfPayment,
      startPaymentAt,
      endPaymentAt,
    } = query;

    const where = {
      deletedAt: null,
      ...(professionalId && { professionalId }),
      ...(itemId && { itemId }),
      ...(itemCatalogId && { itemCatalogId }),
      ...(formOfPayment && { formOfPayment }),
      ...(startPaymentAt &&
        endPaymentAt && {
          paymentAt: {
            gte: new Date(startPaymentAt),
            lte: new Date(endPaymentAt),
          },
        }),
    };

    const [total, professionalItems] = await Promise.all([
      this.prisma.professionalItem.count({ where }),
      this.prisma.professionalItem.findMany({
        where,
        include: {
          itemCatalog: {
            include: {
              item: true,
              itemHealthInsurances: true,
            },
          },
        },
        skip: (pageNumber - 1) * perPage,
        take: perPage,
      }),
    ]);

    const data = professionalItems.map((item) =>
      this.mapFindOneProfessionalItem(item),
    );

    return {
      data,
      pageInfo: getPageInfo(total, pageNumber, perPage),
    };
  }

  async findOne(id: string): Promise<FindOneProfessionalItemOutputDto> {
    const professionalItem = await this.prisma.professionalItem.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        itemCatalog: {
          include: {
            item: true,
            itemHealthInsurances: true,
          },
        },
      },
    });

    return this.mapFindOneProfessionalItem(professionalItem);
  }

  async update(
    id: string,
    data: UpdateProfessionalItemInputBodyDto,
  ): Promise<UpdateProfessionalItemOutputDto> {
    const currentItem = await this.prisma.professionalItem.findUnique({
      where: { id },
      select: {
        formOfPayment: true,
        valuePayment: true,
        percentageValue: true,
      },
    });

    if (!currentItem) {
      throw new BadRequestException('Item não encontrado');
    }

    const formOfPayment = data.formOfPayment || currentItem.formOfPayment;
    const adjustedValues = this.adjustPaymentValues(
      formOfPayment,
      data.valuePayment?.toString() || currentItem.valuePayment.toString(),
      data.percentageValue?.toString() ||
        currentItem.percentageValue.toString(),
    );

    const professionalItem = await this.prisma.professionalItem.update({
      where: {
        id,
      },
      data: {
        ...(data.itemId && { itemId: data.itemId }),
        ...(data.itemCatalogId && { itemCatalogId: data.itemCatalogId }),
        ...(data.formOfPayment && { formOfPayment }),
        ...(data.paymentAt && { paymentAt: new Date(data.paymentAt) }),
        valuePayment: new Decimal(adjustedValues.valuePayment),
        percentageValue: new Decimal(adjustedValues.percentageValue),
        ...(data.accountId && { accountId: data.accountId }),
      },
      include: {
        itemCatalog: {
          include: {
            item: true,
            itemHealthInsurances: true,
          },
        },
      },
    });

    return this.mapFindOneProfessionalItem(professionalItem);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.professionalItem.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
