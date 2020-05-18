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
let GenericEmbeddedObject = class GenericEmbeddedObject {
    constructor(args, objectConstructor) {
        this.id = 0;
        this.organization = "";
        this.data = {};
        this.booleanFieldDefault = false;
        this.definitions = {};
        //TODO: this won't work - need to add properties from args to the object
        //finally?: Object;
        this.finally = undefined;
    }
};
__decorate([
    RTOV_1.property({
        type: "number", minimum: 1
    }),
    __metadata("design:type", Number)
], GenericEmbeddedObject.prototype, "id", void 0);
__decorate([
    RTOV_1.property({
        type: "object",
    }, { extern: 1 }),
    __metadata("design:type", Object)
], GenericEmbeddedObject.prototype, "data", void 0);
__decorate([
    RTOV_1.property({ type: "boolean" }),
    __metadata("design:type", Boolean)
], GenericEmbeddedObject.prototype, "booleanFieldDefault", void 0);
__decorate([
    RTOV_1.property({ type: "object" }),
    __metadata("design:type", Object)
], GenericEmbeddedObject.prototype, "definitions", void 0);
GenericEmbeddedObject = __decorate([
    RTOV_1.validate,
    __metadata("design:paramtypes", [Object, Object])
], GenericEmbeddedObject);
exports.GenericEmbeddedObject = GenericEmbeddedObject;
//# sourceMappingURL=GenericEmbeddedObject.js.map