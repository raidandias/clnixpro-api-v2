// upload.module.ts

import { Module, Global } from '@nestjs/common';
import { S3UploadService } from './s3-upload.service';
import { awsConfig } from './aws.config';

@Global()
@Module({
  providers: [
    S3UploadService,
    {
      provide: 'AWS_CONFIG',
      useValue: awsConfig,
    },
  ],
  exports: [S3UploadService],
})
export class UploadModule {}
