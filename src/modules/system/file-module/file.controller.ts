import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ValidationPipe,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import * as path from 'path';

import { FileService } from './file.service';
import { CreateFileOutputDto } from './dto/output/create-file-output.dto';
import { CreateFileInputBodyDto } from './dto/input/create-file-input-body.dto';
import { FindOneFileOutputDto } from './dto/output/find-one-file-output.dto';
import { FindOneFileInputParamDto } from './dto/input/find-one-file-input-param.dto';

import { HttpExceptionFilter } from 'src/share/error/http-exception-filter';
import { ApiCommonResponses } from 'src/share/utils/apiCommonResponses';
import { JwtAuthGuard } from '../auth-module/auth/jwt-auth.guard';
import { AccountInterceptor } from 'src/share/service/prisma/account.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';

import { Response } from 'express';
import { Readable } from 'stream';

@ApiTags('API File')
@Controller('api/file')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(AccountInterceptor)
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/v1/create')
  @ApiOperation({ summary: 'Create a new File' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'The File has been successfully created.',
    type: CreateFileOutputDto,
  })
  @ApiCommonResponses()
  async create(
    @Body() createFileInputBodyDto: CreateFileInputBodyDto,
    @UploadedFile() file?: Express.Multer.File,
    @Req() req?: any,
  ): Promise<CreateFileOutputDto> {
    createFileInputBodyDto.file = file;
    createFileInputBodyDto.accountId = req.user.account.id;

    return await this.fileService.create(createFileInputBodyDto);
  }

  @Get('/v1/find-one/:path')
  @ApiOperation({ summary: 'Get File with path' })
  @ApiResponse({ status: 200, type: Blob })
  @ApiCommonResponses()
  async findOne(
    @Param(new ValidationPipe({ transform: true }))
    param: FindOneFileInputParamDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const file = await this.fileService.findOne({ path: param.path });

      if (!file) {
        return res.status(404).send({ message: 'File not found' });
      }

      res.setHeader('Content-Type', file.ContentType);

      const fileName = path.basename(param.path);
      if (file.ContentType.startsWith('image/')) {
        res.setHeader('Content-Disposition', 'inline');
      } else {
        // res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader(
          'Content-Disposition',
          `attachment; filename="${fileName}"`,
        );
      }

      if (file.Body instanceof Readable) {
        file.Body.pipe(res);
      } else {
        let fileBody: Buffer;

        if (Buffer.isBuffer(file.Body)) {
          fileBody = file.Body;
        } else if (file.Body instanceof Uint8Array) {
          fileBody = Buffer.from(file.Body);
        } else {
          throw new Error('Tipo de arquivo não suportado.');
        }

        res.send(fileBody);
      }
    } catch (error) {
      console.error('Error fetching file:', error);
      res.status(500).send({ message: 'Error fetching file' });
    }
  }
}
