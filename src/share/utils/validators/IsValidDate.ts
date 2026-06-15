import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { parse, isDate, isAfter } from 'date-fns';

@ValidatorConstraint({ async: false })
export class IsValidDateConstraint implements ValidatorConstraintInterface {
  validate(dateOfBirth: any, args: ValidationArguments) {
    if (typeof dateOfBirth !== 'string') {
      return false;
    }
    const parsedDate = parse(dateOfBirth, 'yyyy-MM-dd', new Date());
    if (!isDate(parsedDate)) {
      return false;
    }
    return !isAfter(parsedDate, new Date());
  }

  defaultMessage(args: ValidationArguments) {
    return 'A data de nascimento deve estar no formato "YYYY-MM-DD" e ser uma data válida no passado.';
  }
}

export function IsValidDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidDateConstraint,
    });
  };
}
