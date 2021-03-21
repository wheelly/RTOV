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
const ObjectData_1 = require("./ObjectData");
let EmbeddedArraySameObjects = class EmbeddedArraySameObjects {
    constructor() {
        this.id = 1;
        this.organization = "001";
        this.elems = [];
    }
};
__decorate([
    RTOV_1.property({
        type: "number", minimum: 1
    }),
    __metadata("design:type", Number)
], EmbeddedArraySameObjects.prototype, "id", void 0);
__decorate([
    RTOV_1.property({
        type: "string",
        minLength: 3,
        optional: true
    }),
    __metadata("design:type", String)
], EmbeddedArraySameObjects.prototype, "organization", void 0);
__decorate([
    RTOV_1.property({
        type: "array",
        items: {
            type: "object",
        }
    }, ObjectData_1.ObjectData),
    __metadata("design:type", Array)
], EmbeddedArraySameObjects.prototype, "elems", void 0);
EmbeddedArraySameObjects = __decorate([
    RTOV_1.validate
], EmbeddedArraySameObjects);
exports.EmbeddedArraySameObjects = EmbeddedArraySameObjects;
//# sourceMappingURL=EmbeddedArraySameComplexObjects.js.map