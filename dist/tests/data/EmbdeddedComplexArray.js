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
let EmbeddedComplexArray = class EmbeddedComplexArray {
    constructor(args) {
        this.id = 0;
        // mandatory here to validate embedded data
        this.data = args.data;
    }
};
__decorate([
    RTOV_1.property({
        type: "number", minimum: 1
    }),
    __metadata("design:type", Number)
], EmbeddedComplexArray.prototype, "id", void 0);
__decorate([
    RTOV_1.property({
        type: "array",
        items: {
            "oneOf": [
                { type: "string" },
                { type: "object" },
                { type: "number" },
            ]
        },
        uniqueItems: true,
        minItems: 1,
        maxItems: 3
    }),
    __metadata("design:type", Array)
], EmbeddedComplexArray.prototype, "data", void 0);
EmbeddedComplexArray = __decorate([
    RTOV_1.validate,
    __metadata("design:paramtypes", [EmbeddedComplexArray])
], EmbeddedComplexArray);
exports.EmbeddedComplexArray = EmbeddedComplexArray;
//# sourceMappingURL=EmbdeddedComplexArray.js.map