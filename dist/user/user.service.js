"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./model/user.schema");
const mongoose_2 = require("mongoose");
const rxjs_1 = require("rxjs");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    create(user) {
        return rxjs_1.from(this.userModel.create(user));
    }
    get(id) {
        return rxjs_1.from(this.userModel.findById(id));
    }
    list(query, options) {
        return rxjs_1.from(this.userModel.find(query || {}, options || {}));
    }
    update(id, user) {
        return rxjs_1.from(this.userModel.findByIdAndUpdate(id, user));
    }
    delete(id) {
        return rxjs_1.from(this.userModel.findByIdAndDelete(id));
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map