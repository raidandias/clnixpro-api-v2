import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

import { CreateFileInputBodyDto } from './dto/input/create-file-input-body.dto';
import { CreateFileOutputDto } from './dto/output/create-file-output.dto';

import { FindOneFileInputParamDto } from './dto/input/find-one-file-input-param.dto';

import { S3UploadService } from 'src/share/service/aws/s3/s3-upload.service';

import * as sharp from 'sharp';

@Injectable()
export class FileService {
  constructor(
    private prisma: PrismaService,
    private s3UploadService: S3UploadService,
  ) {}

  async create(
    createFileInputBodyDto: CreateFileInputBodyDto,
  ): Promise<CreateFileOutputDto> {
    let fileBuffer: Buffer;

    // Verifica se o arquivo é uma imagem
    if (createFileInputBodyDto.file.mimetype.startsWith('image/')) {
      try {
        // Converte o arquivo recebido em buffer
        fileBuffer = createFileInputBodyDto.file.buffer;

        // Otimiza a imagem
        if (createFileInputBodyDto.file.mimetype === 'image/png') {
          // Otimização para PNG, preservando a transparência
          fileBuffer = await sharp(fileBuffer)
            .png({ quality: 80 }) // Pode ajustar a qualidade conforme necessário
            .toBuffer();
        } else {
          // Otimização para outros formatos de imagem
          fileBuffer = await sharp(fileBuffer)
            .resize({ fit: sharp.fit.inside }) // Ajuste de tamanho
            .jpeg({ quality: 80 }) // Formato e qualidade
            .toBuffer();
        }
      } catch (error) {
        console.error('Erro ao otimizar imagem:', error);
        throw new Error('Erro ao processar imagem');
      }
    } else {
      // Se não for uma imagem, simplesmente usa o buffer original
      fileBuffer = createFileInputBodyDto.file.buffer; // Certifique-se de que você tem o buffer aqui
    }

    // Cria um objeto do tipo Express.Multer.File
    const multerFile: Express.Multer.File = {
      fieldname: 'file',
      originalname: createFileInputBodyDto.file.originalname,
      encoding: '7bit', // ou o encoding apropriado
      mimetype: createFileInputBodyDto.file.mimetype,
      size: fileBuffer.length, // O tamanho do buffer
      stream: null, // Para uploads, você pode deixar null
      buffer: fileBuffer, // O buffer otimizado
      destination: '', // Pode ser uma string vazia se não for usado
      filename: `${Date.now()}-${createFileInputBodyDto.file.originalname}`, // Nome do arquivo
      path: '', // Pode ser uma string vazia se não for usado
    };

    // Realiza o upload do arquivo (otimizado ou original)
    const location = await this.s3UploadService.uploadFile(
      multerFile,
      'clinixpro-file-bucket',
      createFileInputBodyDto.path
        ? createFileInputBodyDto.accountId + createFileInputBodyDto.path
        : createFileInputBodyDto.accountId,
    );

    const createFile = await this.prisma.files.create({
      data: {
        name: createFileInputBodyDto.name,
        path: location,
        type: createFileInputBodyDto.file.mimetype,
        accountId: createFileInputBodyDto.accountId,
      },
    });

    return createFile;
  }

  async findOne(
    findOneFileInputParamDto: FindOneFileInputParamDto,
  ): Promise<AWS.S3.GetObjectOutput> {
    const file = await this.prisma.files.findUnique({
      where: {
        path: findOneFileInputParamDto.path,
        deletedAt: null,
      },
    });

    if (!file) {
      throw new NotFoundException(`File not found`);
    }

    const fileS3 = await this.s3UploadService.getFile(
      file.path,
      'clinixpro-file-bucket',
    );

    return fileS3;
  }
}
