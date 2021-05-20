"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigModule = void 0;
const common_1 = require("@nestjs/common");
const configuration_1 = require("./configuration");
const config_1 = require("@nestjs/config");
const Joi = require("@hapi/joi");
const config_service_1 = require("./config.service");
let AppConfigModule = class AppConfigModule {
};
AppConfigModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
                validationSchema: Joi.object({
                    APP_ENV: Joi.string()
                        .valid('development', 'production', 'test')
                        .default('development'),
                    APP_URL: Joi.string().default('localhost'),
                    APP_PORT: Joi.number().default(3000),
                    APP_SECRET: Joi.string().default('')
                })
            })
        ],
        providers: [config_1.ConfigService, config_service_1.AppConfigService],
        exports: [config_1.ConfigService, config_service_1.AppConfigService],
    })
], AppConfigModule);
exports.AppConfigModule = AppConfigModule;
//# sourceMappingURL=config.module.js.map