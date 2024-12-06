import { Injectable } from '@nestjs/common';
import { capitalizeFirstLetter } from 'src/common/utils/string';
import { I18nService } from 'src/i18n/i18n.service';

type SuccessMessageType = 'create' | 'update' | 'delete' | 'login' | 'register';

type ErrorType =
  | 'not_found'
  | 'not_empty'
  | 'not_match'
  | 'not_exist'
  | 'not_valid'
  | 'max_length'
  | 'min_length'
  | 'not_auth'
  | 'existed';

type OptionErrorMessage = {
  max?: number;
  min?: number;
};

@Injectable()
export class SysMessageService {
  constructor(private readonly i18n: I18nService) {}

  getSuccessMessage(field: string, type?: SuccessMessageType){
    const fieldLowerCase = capitalizeFirstLetter(this.i18n.t(`common.fields.${field}` as any) as string);

    switch (type) {
      case 'create':
        return this.i18n.t('common.success.create', { field: fieldLowerCase });
      case 'delete':
        return this.i18n.t('common.success.delete', { field: fieldLowerCase });
      case 'update':
        return this.i18n.t('common.success.update', { field: fieldLowerCase });
      case 'login':
        return this.i18n.t('common.success.login');
      case 'register':
        return this.i18n.t('common.success.register');
      default:
        return this.i18n.t('common.success.default');
    }
  };

  getErrorMessage(
    field: string,
    type: ErrorType,
    options?: OptionErrorMessage,
  ) {
    const { max, min } = options ?? {};
    
    const fieldError = capitalizeFirstLetter(this.i18n.t(`common.fields.${field}` as any) as string);

    switch (type) {
      case 'not_empty':
        return this.i18n.t('common.error.not_empty', { field: fieldError });
      case 'not_found':
        return this.i18n.t('common.error.not_found', { field: fieldError });
      case 'not_match':
        return this.i18n.t('common.error.not_match', { field: fieldError });
      case 'not_exist':
        return this.i18n.t('common.error.not_exist', { field: fieldError });
      case 'not_valid':
        return this.i18n.t('common.error.not_valid', { field: fieldError });
      case 'not_auth':
        return this.i18n.t('common.error.not_auth', { field: fieldError });
      case 'existed':
        return this.i18n.t('common.error.existed', { field: fieldError });
      case 'max_length':
        return this.i18n.t('common.error.max_length', { field: fieldError, max });
      case 'min_length':
        return this.i18n.t('common.error.min_length', { field: fieldError, min });
      default:
        return this.i18n.t('common.error.default');
    }
  }
}
