import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { I18nService } from 'src/i18n/i18n.service';
import { capitalizeFirstLetter } from '../utils/string';

@Injectable()
export class BodyValidationPipe implements PipeTransform<any> {
  constructor(private readonly i18n: I18nService) {}

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);

    const errors = await validate(object);

    if (errors.length > 0) {
      const error = errors[0];

      const constraints = error.constraints;

      const constraintKeys = Object.keys(constraints);

      const firstConstraint = constraints[constraintKeys[0]];

      const errorType = firstConstraint.split('|')[0];
      const args = JSON.parse(firstConstraint.split('|')[1]);

      const fieldError = capitalizeFirstLetter(
        this.i18n.t(args['field'] as any) as string,
      );

      throw new BadRequestException(
        this.i18n.t(errorType as any, { field: fieldError }),
      );
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
