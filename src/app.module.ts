import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './model/user/user.module';
import {GlobalConfigModule} from "./config/config.module";
import {ProviderModule} from "./provider/provider.module";
import {CommonModule} from "./common/common.module";
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
      GlobalConfigModule,
      ProviderModule,
      CommonModule,
      UserModule,
      AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
