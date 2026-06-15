import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

import { CreatePatientInputBodyDto } from './dto/input/create-patient-input-body.dto';
import { CreatePatientOutputDto } from './dto/output/create-patient-output.dto';

import { FindAllPatientOutputDto } from './dto/output/find-all-patient-output.dto';
import { FindOnePatientInputParamDto } from './dto/input/find-one-patient-input-param.dto';
import { FindOnePatientOutputDto } from './dto/output/find-one-patient-output.dto';

import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { FindAllPatientInputQueryDto } from './dto/input/find-all-patient-input-query.dto';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  async create(
    createPatientInputBodyDto: CreatePatientInputBodyDto,
  ): Promise<CreatePatientOutputDto> {
    const patientExists = await this.prisma.patient.findFirst({
      where: {
        userId: createPatientInputBodyDto.userId,
        deletedAt: null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            photo: true,
            countryCodePhone: true,
            areaCodePhone: true,
            phoneNumber: true,
            dateOfBirth: true,
            userStatus: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
          },
        },
      },
    });

    if (patientExists) {
      return patientExists;
    }

    const patient = await this.prisma.patient.create({
      data: createPatientInputBodyDto,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            photo: true,
            countryCodePhone: true,
            areaCodePhone: true,
            phoneNumber: true,
            dateOfBirth: true,
            userStatus: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
          },
        },
      },
    });

    return patient;
  }

  async findAll(
    findAllPatientInputQueryDto: FindAllPatientInputQueryDto,
  ): Promise<FindAllPatientOutputDto> {
    const { page, perPage, ...queryFilters } = findAllPatientInputQueryDto;

    const pageNumber = Number(page) || 1;
    const itemsPerPage = Number(perPage) || 20;

    const [patient, totalItems] = await Promise.all([
      this.prisma.patient.findMany({
        where: { ...queryFilters, deletedAt: null },
        skip: (pageNumber - 1) * itemsPerPage,
        take: itemsPerPage,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              photo: true,
              countryCodePhone: true,
              areaCodePhone: true,
              phoneNumber: true,
              dateOfBirth: true,
              userStatus: true,
              createdAt: true,
              updatedAt: true,
              deletedAt: true,
            },
          },
        },
      }),
      this.prisma.patient.count({
        where: { ...queryFilters, deletedAt: null },
      }),
    ]);

    const pageInfo = getPageInfo(totalItems, pageNumber, itemsPerPage);

    const response: FindAllPatientOutputDto = {
      data: patient,
      pageInfo,
    };

    return response;
  }

  async findOne(
    findOnePatientInputParamDto: FindOnePatientInputParamDto,
  ): Promise<FindOnePatientOutputDto> {
    const patient = await this.prisma.patient.findUnique({
      where: {
        id: findOnePatientInputParamDto.id,
        deletedAt: null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            photo: true,
            countryCodePhone: true,
            areaCodePhone: true,
            phoneNumber: true,
            dateOfBirth: true,
            userStatus: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
          },
        },
      },
    });

    if (!patient) {
      throw new NotFoundException(`Patient not found`);
    }

    return patient;
  }
}
