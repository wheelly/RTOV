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
const rtov_1 = require("../../rtov");
let ExampleUserData = class ExampleUserData {
    constructor() {
        this.currency = "ILS";
        this.name = "";
        this.surname = "";
    }
};
__decorate([
    rtov_1.property({
        type: "string",
        enum: ["ILS", "EUR", "USD"]
    }),
    __metadata("design:type", String)
], ExampleUserData.prototype, "currency", void 0);
__decorate([
    rtov_1.property({ type: "string" }),
    __metadata("design:type", String)
], ExampleUserData.prototype, "name", void 0);
__decorate([
    rtov_1.property({ type: "string" }),
    __metadata("design:type", String)
], ExampleUserData.prototype, "surname", void 0);
ExampleUserData = __decorate([
    rtov_1.validate
], ExampleUserData);
exports.ExampleUserData = ExampleUserData;
//# sourceMappingURL=ExampleUserData.js.map