import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {GlobalConfigModule} from "./config/config.module";
import {ProviderModule} from "./provider/provider.module";
import {CommonModule} from "./common/common.module";
import { AuthModule } from './auth/auth.module';
import { PermissionModule } from './permission/permission.module';
import {ModelModule} from "./model/model.module";


@Module({
  imports: [
      GlobalConfigModule,
      ProviderModule,
      ModelModule,
      CommonModule,
      AuthModule,
      PermissionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
