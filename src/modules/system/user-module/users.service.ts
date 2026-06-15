import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/share/service/prisma/prisma.service';
import { S3UploadService } from 'src/share/service/aws/s3/s3-upload.service';

import { CreateUserInputBodyDto } from './dto/input/create-user-input.dto';
import { CreateUserOutputDto } from './dto/output/create-user-output.dto';
import { UpdateUserInputBodyDto } from './dto/input/update-user-input.dto';
import { UpdateUserOutputDto } from './dto/output/update-user-output.dto';
import { FindAllUsersOutputDto } from './dto/output/find-all-user-output.dto';
import { FindOneUserInputParamDto } from './dto/input/find-one-user-input.dto';
import { FindOneUserOutputDto } from './dto/output/find-one-user-output.dto';
import { CreateUserDocumentInputBodyDto } from './dto/input/create-user-document-input.dto';
import { UpdateUserDocumentInputBodyDto } from './dto/input/update-user-document-input.dto';
import { FindOneEmailUserInputParamDto } from './dto/input/find-one-email-user-input.dto';
import { FindOneEmailUserOutputDto } from './dto/output/find-one-email-user-output.dto';
import { PhotoUserOutputDto } from './dto/output/photo-user-output.dto';

import { Document, DocumentStatus, UserStatus } from '@prisma/client';
import { getPageInfo } from 'src/share/dto/output/page-info.dto';
import { CreateUserDocumentOutputDto } from './dto/output/create-user-document-output';
import { CreateAddressInputBodyDto } from './dto/input/create-user-address-input.dto';
import { CreateAddressOutputDto } from './dto/output/create-user-address-output';
import { UpdateAddressInputBodyDto } from './dto/input/update-user-address-input.dto';
import { MailService } from 'src/share/service/mailgun/mail.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private s3: S3UploadService,
    private mailService: MailService,
  ) {}

  async create(
    createUserDto: CreateUserInputBodyDto,
  ): Promise<CreateUserOutputDto> {
    const {
      email,
      name,
      password,
      photo,
      countryCodePhone,
      areaCodePhone,
      phoneNumber,
      dateOfBirth,
    } = createUserDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        photo,
        countryCodePhone,
        areaCodePhone,
        phoneNumber,
        userStatus: UserStatus.ENABLE,
        dateOfBirth,
      },
    });

    const userOutput: CreateUserOutputDto = {
      id: user.id,
      name: user.name,
      email: user.email,
      photo: user.photo,
      countryCodePhone: user.countryCodePhone,
      areaCodePhone: user.areaCodePhone,
      phoneNumber: user.phoneNumber,
      dateOfBirth: user.dateOfBirth,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      userStatus: user.userStatus,
    };

    return userOutput;
  }

  async findAll(
    page: number,
    perPage: number,
    name?: string,
    email?: string,
    documentNumber?: string,
    city?: string,
  ): Promise<FindAllUsersOutputDto> {
    const filters: any = {};
    if (name) {
      filters.name = { contains: name, mode: 'insensitive' };
    }
    if (email) {
      filters.email = { contains: email, mode: 'insensitive' };
    }
    if (documentNumber) {
      filters.UserDocument = {
        some: { documentNumber: { contains: documentNumber } },
      };
    }
    if (city) {
      filters.Address = { some: { city: { contains: city } } };
    }
    filters.deletedAt = null;

    const [users, totalItems] = await Promise.all([
      this.prisma.user.findMany({
        where: filters,
        skip: (page - 1) * perPage,
        take: Number(perPage),
        include: {
          userDocuments: true,
          accountUsers: true,
        },
      }),
      this.prisma.user.count({ where: filters }),
    ]);

    const pageInfo = getPageInfo(totalItems, page, perPage);

    const response: FindAllUsersOutputDto = {
      data: users,
      pageInfo,
    };

    return response;
  }

  async findOne(
    findOneUserInputDto: FindOneUserInputParamDto,
  ): Promise<FindOneUserOutputDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: findOneUserInputDto.id,
        deletedAt: null,
      },
    });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  async findOneEmail(
    findOneEmailUserInputDto: FindOneEmailUserInputParamDto,
  ): Promise<FindOneEmailUserOutputDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: findOneEmailUserInputDto.email,
        deletedAt: null,
      },
    });

    return user;
  }

  async changePassword({
    email,
    newPassword,
    newPasswordConfirmation,
  }): Promise<UpdateUserOutputDto> {
    if (newPassword !== newPasswordConfirmation) {
      throw new BadRequestException('Password confirmation does not match');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
    });

    return updatedUser;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserInputBodyDto,
  ): Promise<UpdateUserOutputDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    if (updateUserDto.email) {
      const existingUser = await this.prisma.user.findFirst({
        where: { email: updateUserDto.email },
      });

      if (existingUser && existingUser.id !== id) {
        throw new BadRequestException('Email is already in use');
      }
    }

    const updatedUser = await this.prisma.user.update({
      where: { id, deletedAt: null },
      data: updateUserDto,
    });

    return updatedUser;
  }

  async photo(
    id: string,
    file: Express.Multer.File,
  ): Promise<PhotoUserOutputDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    const location = await this.s3.uploadFile(file, 'user-photo');

    const updatedUser = await this.prisma.user.update({
      where: { id, deletedAt: null },
      data: {
        photo: location,
      },
    });

    return updatedUser;
  }

  async createUserDocument(
    createUserDocumentDto: CreateUserDocumentInputBodyDto,
    userId: string,
    file?: Express.Multer.File,
  ): Promise<CreateUserDocumentOutputDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    const existingDocument = await this.prisma.document.findFirst({
      where: {
        type: createUserDocumentDto.type,
        userDocuments: {
          some: {
            userId: userId,
          },
        },
      },
    });

    if (existingDocument) {
      throw new BadRequestException(`Document type already exists`);
    }

    // const location = await this.s3.uploadFile(file, 'user-document');

    const location = 'https://example.com/photo.jpg';

    const { type, number } = createUserDocumentDto;

    const document: Document = await this.prisma.document.create({
      data: {
        type,
        number,
        filePath: location,
        status: DocumentStatus.AWAITING_VERIFICATION,
      },
    });

    await this.prisma.userDocument.create({
      data: {
        userId,
        documentId: document.id,
        isActive: true,
      },
    });

    const documentOutput: CreateUserDocumentOutputDto = {
      id: document.id,
      userId,
      status: document.status,
      createdAt: document.createdAt.toISOString(),
      updatedAt: document.updatedAt.toISOString(),
    };

    return documentOutput;
  }

  async updateUserDocument(
    documentId: string,
    updateUserDocumentDto: UpdateUserDocumentInputBodyDto,
    userId: string,
    file?: Express.Multer.File,
  ): Promise<CreateUserDocumentOutputDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const document = await this.prisma.document.findUnique({
      where: { id: documentId },
      include: { userDocuments: true },
    });

    if (
      !document ||
      !document.userDocuments.some((ud) => ud.userId === userId)
    ) {
      throw new NotFoundException(
        'Document not found or does not belong to the user',
      );
    }

    let location = document.filePath;
    if (file) {
      // location = await this.s3.uploadFile(file, 'user-document');
      location = 'https://example.com/photo.jpg';
    }

    const updatedDocument = await this.prisma.document.update({
      where: { id: documentId },
      data: {
        type: updateUserDocumentDto.type ?? document.type,
        number: updateUserDocumentDto.number ?? document.number,
        filePath: location,
        status: updateUserDocumentDto.status ?? document.status,
      },
    });

    const documentOutput: CreateUserDocumentOutputDto = {
      id: updatedDocument.id,
      userId,
      status: updatedDocument.status,
      createdAt: updatedDocument.createdAt.toISOString(),
      updatedAt: updatedDocument.updatedAt.toISOString(),
    };

    return documentOutput;
  }

  async createUserAddress(
    createAddressDto: CreateAddressInputBodyDto,
    userId: string,
  ): Promise<CreateAddressOutputDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    const { label, street, city, state, country, complement } =
      createAddressDto;

    const address = await this.prisma.address.create({
      data: {
        userId,
        label,
        street,
        city,
        state,
        country,
        complement,
        isActive: true,
      },
    });

    const addressResponse: CreateAddressOutputDto = {
      id: address.id,
      userId: address.userId,
      label: address.label,
      street: address.street,
      city: address.city,
      state: address.state,
      country: address.country,
      complement: address.complement,
      isActive: address.isActive,
      createdAt: address.createdAt.toISOString(),
      updatedAt: address.updatedAt.toISOString(),
    };

    return addressResponse;
  }

  async updateUserAddress(
    userId: string,
    addressId: string,
    updateAddressDto: UpdateAddressInputBodyDto,
  ): Promise<UpdateAddressInputBodyDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    const address = await this.prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!address) {
      throw new NotFoundException(`Address not found`);
    }

    if (address.userId !== userId) {
      throw new NotFoundException(`Address does not belong to the user`);
    }

    const updatedAddress = await this.prisma.address.update({
      where: { id: addressId },
      data: updateAddressDto,
    });

    const addressResponse: CreateAddressOutputDto = {
      id: updatedAddress.id,
      userId: updatedAddress.userId,
      label: updatedAddress.label,
      street: updatedAddress.street,
      city: updatedAddress.city,
      state: updatedAddress.state,
      country: updatedAddress.country,
      complement: updatedAddress.complement,
      isActive: updatedAddress.isActive,
      createdAt: updatedAddress.createdAt.toISOString(),
      updatedAt: updatedAddress.updatedAt.toISOString(),
    };

    return addressResponse;
  }
}
