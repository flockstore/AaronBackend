import {Test, TestingModule} from "@nestjs/testing";
import {GlobalConfigModule} from "../../config/config.module";
import {JwtModule} from "@nestjs/jwt";
import {AuthConfigService} from "../../config/auth/config.service";
import {TokenSerializer} from "./token.serializer";

describe('TokenSerializer', () => {

    let tokenSerializer: TokenSerializer;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                GlobalConfigModule,
                JwtModule.registerAsync({
                    imports: [GlobalConfigModule],
                    useFactory: async (authConfigService: AuthConfigService) => ({
                        secret: authConfigService.secret,
                        signOptions: { expiresIn: authConfigService.expiration }
                    }),
                    inject: [AuthConfigService]
                })
            ],
            providers: [TokenSerializer]
        }).compile();

        tokenSerializer = module.get<TokenSerializer>(TokenSerializer);

    });

    it('should be defined', () => {
        expect(tokenSerializer).toBeDefined();
    });

    it('should encrypt and decrypt a payload', () => {
        const token = tokenSerializer.encryptPayload<string>('hello');
        expect(tokenSerializer.decryptPayload(token)).toHaveProperty('data', 'hello');
    });

});
