"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoConfigModule = void 0;
const common_1 = require("@nestjs/common");
const configuration_1 = require("./configuration");
const config_1 = require("@nestjs/config");
const Joi = require("@hapi/joi");
const config_service_1 = require("./config.service");
let MongoConfigModule = class MongoConfigModule {
};
MongoConfigModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
                validationSchema: Joi.object({
                    MONGO_URI: Joi.string().default('mongodb://localhost:27017/aaron')
                })
            })
        ],
        providers: [config_1.ConfigService, config_service_1.MongoConfigService],
        exports: [config_1.ConfigService, config_service_1.MongoConfigService],
    })
], MongoConfigModule);
exports.MongoConfigModule = MongoConfigModule;
//# sourceMappingURL=config.module.js.map