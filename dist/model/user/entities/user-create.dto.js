"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreate = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("./user.entity");
let UserCreate = class UserCreate extends user_entity_1.UserPartial {
};
UserCreate = __decorate([
    mongoose_1.Schema()
], UserCreate);
exports.UserCreate = UserCreate;
//# sourceMappingURL=user-create.dto.js.map