"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = config_1.registerAs('app', () => ({
    port: process.env.APP_PORT,
    url: process.env.APP_URL,
    env: process.env.APP_ENVIRONMENT,
    secret: process.env.APP_SECRET
}));
//# sourceMappingURL=configuration.js.map