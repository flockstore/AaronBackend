"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDatabaseProviderModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_module_1 = require("../../config/mongo/config.module");
const config_service_1 = require("../../config/mongo/config.service");
let MongoDatabaseProviderModule = class MongoDatabaseProviderModule {
};
MongoDatabaseProviderModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_module_1.MongoConfigModule],
                useFactory: async (mongoService) => ({
                    uri: mongoService.uri,
                    useCreateIndex: true,
                    useNewUrlParser: true,
                    useFindAndModify: false
                }),
                inject: [config_service_1.MongoConfigService]
            })
        ],
    })
], MongoDatabaseProviderModule);
exports.MongoDatabaseProviderModule = MongoDatabaseProviderModule;
//# sourceMappingURL=provider.module.js.map