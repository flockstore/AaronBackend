import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import {ValidationPipe} from "@nestjs/common";
import {AppConfigService} from "./config/app/config.service";

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const appConfig: AppConfigService = app.get(AppConfigService);

  await app.listen(appConfig.port, appConfig.url);
}
bootstrap();
