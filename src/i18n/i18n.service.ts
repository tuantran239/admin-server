import { Injectable } from '@nestjs/common';
import { PathImpl2 } from '@nestjs/config';
import {
  I18nContext,
  I18nService as NestI18nService,
  TranslateOptions,
} from 'nestjs-i18n';
import { I18nTranslations } from 'src/common/generated/i18n.generated';

@Injectable()
export class I18nService {
  constructor(private readonly i18n: NestI18nService) {}

  t(
    key: PathImpl2<I18nTranslations>,
    args?: { [k: string]: PathImpl2<I18nTranslations> } | Record<string, any>,
    options?: TranslateOptions,
  ) {
    const translateOptions = options ?? {};
    const lang = I18nContext.current().lang;
    return this.i18n.translate(key, {
      lang,
      ...translateOptions,
      args,
    }) as string;
  }
}
