import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';
import { MailService } from 'src/share/service/mailgun/mail.service';
import { ConfigService } from '@nestjs/config';

import { CreateProfessionalInputBodyDto } from './dto/input/create-professional-input-body.dto';
import { CreateProfessionalOutputDto } from './dto/output/create-professional-output.dto';
import { FindAllProfessionalInputQueryDto } from './dto/input/find-all-professional-input-query.dto';
import { FindAllProfessionalOutputDto } from './dto/output/find-all-professional-output.dto';
import { FindOneProfessionalInputParamDto } from './dto/input/find-one-professional-input-param.dto';
import { FindOneProfessionalOutputDto } from './dto/output/find-one-professional-output.dto';
import {
  UpdateProfessionalInputBodyDto,
  UpdateProfessionalInputParamDto,
} from './dto/input/update-professional-input-param-hibrido.dto';
import { UpdateProfessionalOutputDto } from './dto/output/update-professional-output.dto';
import { DeleteProfessionalInputParamDto } from './dto/input/delete-professional-input-param.dto';
import { DeleteProfessionalOutputDto } from './dto/output/delete-professional-output.dto';
import { CreateProfessionalWithUserInputBodyDto } from './dto/input/create-professional-with-user-input-body.dto';

import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { UsersService } from 'src/modules/system/user-module/users.service';
import { AccountUserService } from 'src/modules/system/account-module/account-user/account-user.service';
import { AccountUserStatus, AccountUserType } from '@prisma/client';
import { getProfessionalWelcomeTemplate } from './templates/professional-welcome.template';

@Injectable()
export class ProfessionalService {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService,
    private accountUserService: AccountUserService,
    private mailService: MailService,
    private configService: ConfigService,
  ) {}

  private async sendWelcomeEmail(professionalData: {
    user: { name: string; email: string };
    account: { name: string };
  }) {
    const clinicName = professionalData.account.name;
    const cooperativeName =
      this.configService.get<string>('COOPERATIVE_NAME') || clinicName;
    const responsibleName =
      this.configService.get<string>('RESPONSIBLE_NAME') || 'Administração';
    const responsibleRole =
      this.configService.get<string>('RESPONSIBLE_ROLE') || 'Administrador';
    const contact =
      this.configService.get<string>('CONTACT_INFO') ||
      'contato@clinica.com.br';

    const template = getProfessionalWelcomeTemplate({
      doctorName: professionalData.user.name,
      clinicName,
      cooperativeName,
      responsibleName,
      responsibleRole,
      contact,
    });

    await this.mailService.sendEmail(
      [professionalData.user.email],
      template.subject,
      template.text,
      template.html,
    );
  }

  async create(
    createProfessionalInputBodyDto: CreateProfessionalInputBodyDto,
  ): Promise<CreateProfessionalOutputDto> {
    const { userId, accountId, ocupation } = createProfessionalInputBodyDto;

    // Verify if user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        professionals: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    // Get account information
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
      select: { name: true },
    });

    if (!account) {
      throw new NotFoundException(`Account not found`);
    }

    const professional = await this.prisma.professional.create({
      data: {
        userId,
        accountId,
        ocupation,
      },
      include: {
        user: true,
      },
    });

    // Enviar email de boas-vindas
    this.sendWelcomeEmail({
      user: {
        name: user.name,
        email: user.email,
      },
      account,
    });

    return professional;
  }

  async createWithUser(
    createProfessionalWithUserInputBodyDto: CreateProfessionalWithUserInputBodyDto,
  ): Promise<CreateProfessionalOutputDto> {
    const {
      // Professional data
      ocupation,
      accountId,
      // User data
      name,
      email,
      password,
      photo,
      countryCodePhone,
      areaCodePhone,
      phoneNumber,
      dateOfBirth,
    } = createProfessionalWithUserInputBodyDto;

    // Create user first
    const user = await this.userService.create({
      name,
      email,
      password,
      photo,
      countryCodePhone,
      areaCodePhone,
      phoneNumber,
      dateOfBirth,
    });

    // Create professional with the new user
    const professional = await this.prisma.professional.create({
      data: {
        userId: user.id,
        accountId,
        ocupation,
      },
      include: {
        user: true,
      },
    });

    // Get account information
    const account = await this.prisma.account.findUnique({
      where: { id: professional.accountId },
      select: { name: true },
    });

    if (!account) {
      throw new NotFoundException(`Account not found`);
    }

    // Enviar email de boas-vindas
    await this.sendWelcomeEmail({
      user: {
        name: user.name,
        email: user.email,
      },
      account,
    });

    const existingAccountUser = await this.accountUserService.findAll({
      userId: user.id,
      accountId: professional.accountId,
      page: '1',
      perPage: '1',
    });

    if (!existingAccountUser) {
      await this.accountUserService.create({
        userId: user.id,
        accountId: professional.accountId,
        position: ocupation,
        status: AccountUserStatus.ENABLED,
        type: AccountUserType.TEAM,
      });
    }

    return professional;
  }

  async findAll(
    findAllProfessionalInputQueryDto: FindAllProfessionalInputQueryDto,
  ): Promise<FindAllProfessionalOutputDto> {
    const { page, perPage, userName, ...queryFilters } =
      findAllProfessionalInputQueryDto;

    const pageNumber = Number(page);
    const itemsPerPage = Number(perPage);

    const normalizeString = (str: string) =>
      str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

    const where = {
      ...queryFilters,
      deletedAt: null,
      ...(userName && {
        user: {
          is: {
            OR: [
              {
                name: {
                  contains: userName,
                  mode: 'insensitive' as const,
                },
              },
              {
                name: {
                  contains: normalizeString(userName),
                  mode: 'insensitive' as const,
                },
              },
            ],
          },
        },
      }),
    };

    const [professionals, totalItems] = await Promise.all([
      this.prisma.professional.findMany({
        where,
        include: {
          user: {
            select: {
              name: true,
              email: true,
              areaCodePhone: true,
              countryCodePhone: true,
              phoneNumber: true,
              dateOfBirth: true,
            },
          },
        },
        skip: pageNumber > 0 ? (pageNumber - 1) * itemsPerPage : 0,
        take: itemsPerPage > 0 ? itemsPerPage : undefined,
      }),
      this.prisma.professional.count({
        where,
      }),
    ]);

    return {
      data: professionals,
      pageInfo: getPageInfo(totalItems, pageNumber, itemsPerPage),
    };
  }

  async findOne(
    findOneProfessionalInputParamDto: FindOneProfessionalInputParamDto,
  ): Promise<FindOneProfessionalOutputDto> {
    const professional = await this.prisma.professional.findUnique({
      where: {
        id: findOneProfessionalInputParamDto.id,
        deletedAt: null,
      },
      include: {
        user: true,
      },
    });

    if (!professional) {
      throw new NotFoundException(`Professional not found`);
    }

    return professional;
  }

  async update(
    updateProfessionalInputParamDto: UpdateProfessionalInputParamDto,
    updateProfessionalInputBodyDto: UpdateProfessionalInputBodyDto,
  ): Promise<UpdateProfessionalOutputDto> {
    const professional = await this.prisma.professional.findUnique({
      where: {
        id: updateProfessionalInputParamDto.id,
        deletedAt: null,
      },
    });

    if (!professional) {
      throw new NotFoundException(`Professional not found`);
    }

    const updatedProfessional = await this.prisma.professional.update({
      where: {
        id: updateProfessionalInputParamDto.id,
      },
      data: {
        ...updateProfessionalInputBodyDto,
      },
      include: {
        user: true,
      },
    });

    return updatedProfessional;
  }

  async delete(
    deleteProfessionalInputParamDto: DeleteProfessionalInputParamDto,
  ): Promise<DeleteProfessionalOutputDto> {
    const professional = await this.prisma.professional.findUnique({
      where: {
        id: deleteProfessionalInputParamDto.id,
        deletedAt: null,
      },
    });

    if (!professional) {
      throw new NotFoundException(`Professional not found`);
    }

    const deletedProfessional = await this.prisma.professional.update({
      where: {
        id: deleteProfessionalInputParamDto.id,
      },
      data: {
        deletedAt: new Date(),
      },
      include: {
        user: true,
      },
    });

    return deletedProfessional;
  }
}
