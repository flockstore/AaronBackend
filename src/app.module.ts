import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {GlobalConfigModule} from "./config/config.module";
import {ProviderModule} from "./provider/provider.module";


@Module({
  imports: [
      GlobalConfigModule,
      ProviderModule,
      UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
