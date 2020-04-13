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
let ExampleUser = class ExampleUser {
    constructor(args, embeddedConstructor) {
        this.id = 0;
        this.organization = "";
        // mandatory here to validate embedded data
        this.data = new embeddedConstructor(args.data);
    }
};
__decorate([
    rtov_1.property({
        type: "number", minimum: 1
    }),
    __metadata("design:type", Number)
], ExampleUser.prototype, "id", void 0);
__decorate([
    rtov_1.property({
        type: "object",
    }),
    __metadata("design:type", Object)
], ExampleUser.prototype, "data", void 0);
ExampleUser = __decorate([
    rtov_1.validate,
    __metadata("design:paramtypes", [Object, Object])
], ExampleUser);
exports.ExampleUser = ExampleUser;
//# sourceMappingURL=ExampleUser.js.map