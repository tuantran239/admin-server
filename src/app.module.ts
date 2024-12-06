import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { I18nModule as NestI18nModule, QueryResolver } from 'nestjs-i18n';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

import * as path from 'path';
import { BodyValidationPipe } from './common/pipes/body-validation.pipe';
import { I18nModule } from './i18n/i18n.module';
import { I18nService } from './i18n/i18n.service';
import { SysMessageModule } from './sys-message/sys-message.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    NestI18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/locales/'),
        watch: true,
      },
      resolvers: [new QueryResolver(['lang'])],
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    I18nModule,
    SysMessageModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      inject: [I18nService],
      useFactory: (i18n: I18nService) => new BodyValidationPipe(i18n),
    },
  ],
})
export class AppModule {}
