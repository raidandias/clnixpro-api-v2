import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { Express } from 'express';

export function IsFile(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsFile',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return (
            value &&
            typeof value === 'object' &&
            'fieldname' in value &&
            'originalname' in value &&
            'encoding' in value &&
            'mimetype' in value &&
            'size' in value
          );
        },
        defaultMessage(args: ValidationArguments) {
          return 'A file must be uploaded';
        },
      },
    });
  };
}
