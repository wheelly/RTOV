"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isComplexType = (value) => {
    return typeof value === "object"
        && value !== null
        && !(value instanceof Boolean)
        && !(value instanceof Date)
        && !(value instanceof Number)
        && !(value instanceof RegExp)
        && !(value instanceof String);
};
//# sourceMappingURL=common.js.map