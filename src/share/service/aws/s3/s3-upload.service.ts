// s3-upload.service.ts

import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { awsConfig } from './aws.config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3UploadService {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: awsConfig.accessKeyId,
      secretAccessKey: awsConfig.secretAccessKey,
      region: awsConfig.region,
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    bucketName: string,
    path?: string,
  ): Promise<string> {
    const uniqueFileName = `${uuidv4()}-${file.originalname}`;

    const params: AWS.S3.PutObjectRequest = {
      Bucket: bucketName,
      Key: path ? `${path}/${uniqueFileName}` : uniqueFileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const { Key } = await this.s3.upload(params).promise();

    console.log('type', file.mimetype);

    return Key;
  }

  async getFile(
    key: string,
    bucketName: string,
  ): Promise<AWS.S3.GetObjectOutput> {
    const params: AWS.S3.GetObjectRequest = {
      Bucket: bucketName,
      Key: key,
    };

    const data = await this.s3.getObject(params).promise();
    return data;
  }
}
