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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.UserPartial = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const partial_model_1 = require("../../../common/model/partial-model");
const validateEmail = function (email) {
    const re = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};
let User = class User extends mongoose_2.Document {
};
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "surname", void 0);
__decorate([
    mongoose_1.Prop({ required: true, unique: true, validate: validateEmail }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    mongoose_1.Prop({ required: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    mongoose_1.Prop({ required: false }),
    __metadata("design:type", String)
], User.prototype, "salt", void 0);
User = __decorate([
    mongoose_1.Schema()
], User);
exports.User = User;
class UserPartial extends partial_model_1.PartialModel {
}
exports.UserPartial = UserPartial;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.entity.js.map