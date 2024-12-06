import {
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UpdateUserDto {
  @IsString({
    message: i18nValidationMessage('common.error.not_empty', { field: 'common.fields.username' }),
  })
  @IsOptional()
  username?: string;

  @IsOptional()
  @IsString({
    message: i18nValidationMessage('common.error.not_empty', { field: 'common.fields.username' }),
  })
  @MaxLength(32, {
    message: i18nValidationMessage('common.error.not_empty', { field: 'common.fields.username' }),
  })
  @MinLength(6, {
    message: i18nValidationMessage('common.error.not_empty', { field: 'common.fields.username' }),
  })
  password?: string;

  @IsOptional()
  @IsPhoneNumber(undefined, {
    message: i18nValidationMessage('common.error.not_empty', { field: 'common.fields.username' }),
  })
  phoneNumber?: string;

  @IsOptional()
  status?: any;
}
