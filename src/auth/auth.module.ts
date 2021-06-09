import {Module} from '@nestjs/common';
import {PasswordSerializer} from './serializer/password.serializer';
import {JwtModule} from '@nestjs/jwt';
import {AuthConfigService} from '../config/auth/config.service';
import {AuthService} from './auth.service';
import {GlobalConfigModule} from '../config/config.module';
import {UserModule} from '../model/user/user.module';
import {TokenSerializer} from './serializer/token.serializer';
import {APP_GUARD} from '@nestjs/core';
import {JwtAuthGuard} from './guard/jwt-auth.guard';
import {AuthController} from './auth.controller';
import {JwtStrategy} from './strategy/jwt.strategy';
import {PassportModule} from '@nestjs/passport';
import {MailProviderModule} from '../provider/mail/provider.module';

@Module({
    providers: [
        PasswordSerializer,
        AuthService,
        TokenSerializer,
        JwtStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        }
    ],
    controllers: [
        AuthController
    ],
    imports: [
        GlobalConfigModule,
        UserModule,
        PassportModule,
        MailProviderModule,
        JwtModule.registerAsync({
            imports: [GlobalConfigModule],
            useFactory: async (authConfigService: AuthConfigService) => ({
                secret: authConfigService.secret,
                signOptions: { expiresIn: authConfigService.expiration }
            }),
            inject: [AuthConfigService]
        })
    ],

    exports: [
        PasswordSerializer,
        JwtModule
    ],
})
export class AuthModule {}
