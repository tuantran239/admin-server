import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser';
import 'dotenv/config';
import { AllExceptionsFilter } from './common/exception-filter/all-exception-filter';
import { I18nValidationPipe } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapter = app.get(HttpAdapterHost);

  app.use(cookieParser());

  app.enableCors({
    origin: process.env.CLIENT_URL ?? 'http://localhost:5173',
  });

  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.useGlobalPipes(
    new I18nValidationPipe(),
  );

  await app.listen(process.env.PORT ?? 9001, () => {
    console.log('Listening on port ' + process.env.PORT);
  });
}

bootstrap();
