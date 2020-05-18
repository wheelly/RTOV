"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PROP_PREFIX = "__";
exports.getPublicProperties = (obj) => Object.getOwnPropertyNames(obj).filter((prop) => !prop.startsWith(PROP_PREFIX));
exports.getPropName = (name) => PROP_PREFIX + name;
exports.setReadOnlyProperty = (obj, prop, data) => {
    Object.defineProperty(obj, exports.getPropName(prop), {
        value: data,
        writable: false,
        configurable: true //let it be redefined
    });
};
// export const isComplexType = (value: any) => {
//   return typeof value === "object"
//     && value !== null
//     && ! Array.isArray(value)
//     && !(value instanceof Boolean)
//     && !(value instanceof Date)
//     && !(value instanceof Number)
//     && !(value instanceof RegExp)
//     && !(value instanceof String)
// }
//# sourceMappingURL=common.js.map