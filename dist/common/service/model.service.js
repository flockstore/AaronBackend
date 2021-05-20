"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelService = void 0;
const rxjs_1 = require("rxjs");
class ModelService {
    constructor(model) {
        this.model = model;
    }
    create(user) {
        return rxjs_1.from(this.model.create(user));
    }
    get(id) {
        return rxjs_1.from(this.model.findById(id));
    }
    list(query, projection, options) {
        return rxjs_1.from(this.model.find(query, projection, options));
    }
    update(id, update) {
        return rxjs_1.from(this.model.findByIdAndUpdate(id, update, { new: true }));
    }
    delete(id) {
        return rxjs_1.from(this.model.findByIdAndDelete(id));
    }
}
exports.ModelService = ModelService;
//# sourceMappingURL=model.service.js.map