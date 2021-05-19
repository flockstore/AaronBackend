"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = config_1.registerAs('mongo', () => ({
    uri: process.env.MONGO_URI
}));
//# sourceMappingURL=configuration.js.map