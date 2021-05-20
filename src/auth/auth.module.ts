import { Module } from '@nestjs/common';
import {PasswordSerializer} from "./serializer/password.serializer";
import {JwtModule} from "@nestjs/jwt";
import {AuthConfigService} from "../config/auth/config.service";
import {AuthService} from "./auth.service";
import {GlobalConfigModule} from "../config/config.module";
import {UserModule} from "../model/user/user.module";
import {TokenSerializer} from "./serializer/token.serializer";

@Module({
    providers: [
        PasswordSerializer,
        AuthService,
        TokenSerializer
    ],
    exports: [PasswordSerializer],
    imports: [
        GlobalConfigModule,
        UserModule,
        JwtModule.registerAsync({
            imports: [GlobalConfigModule],
            useFactory: async (authConfigService: AuthConfigService) => ({
                secret: authConfigService.secret,
                signOptions: { expiresIn: authConfigService.expiration }
            }),
            inject: [AuthConfigService]
        })
    ]
})
export class AuthModule {}
