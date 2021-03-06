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
const RTOV_1 = require("../../RTOV");
let ObjectData = class ObjectData {
    constructor(args) {
        this.currency = "ILS";
        this.name = "";
        this.surname = "";
    }
};
__decorate([
    RTOV_1.property({
        type: "string",
        enum: ["ILS", "EUR", "USD"]
    }),
    __metadata("design:type", String)
], ObjectData.prototype, "currency", void 0);
__decorate([
    RTOV_1.property({ type: "string" }),
    __metadata("design:type", String)
], ObjectData.prototype, "name", void 0);
__decorate([
    RTOV_1.property({ type: "string" }),
    __metadata("design:type", String)
], ObjectData.prototype, "surname", void 0);
ObjectData = __decorate([
    RTOV_1.validate,
    __metadata("design:paramtypes", [ObjectData])
], ObjectData);
exports.ObjectData = ObjectData;
let ObjectDataExt = class ObjectDataExt extends ObjectData {
    constructor(args) {
        super(args);
        this.extended = "12345";
        this.name = "Z";
    }
};
__decorate([
    RTOV_1.property({ type: "string", minLength: 5 }),
    __metadata("design:type", String)
], ObjectDataExt.prototype, "extended", void 0);
__decorate([
    RTOV_1.property({ type: "string", minLength: 1 }),
    __metadata("design:type", String)
], ObjectDataExt.prototype, "name", void 0);
ObjectDataExt = __decorate([
    RTOV_1.validate,
    __metadata("design:paramtypes", [ObjectDataExt])
], ObjectDataExt);
exports.ObjectDataExt = ObjectDataExt;
//# sourceMappingURL=ObjectData.js.map