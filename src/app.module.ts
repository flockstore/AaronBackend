import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import { UserModule } from './user/user.module';
import configuration from "./config/configuration";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [
      ConfigModule.forRoot({
        load: [configuration]
      }),
      MongooseModule.forRoot(configuration().database.uri),
      UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
