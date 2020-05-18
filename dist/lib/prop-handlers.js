"use strict";
//import {isComplexType} from "./index";
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
// export const setPropertyRecursive = (obj: any, prop: string, data: any) => {
//   if (isComplexType(obj[prop]) && isComplexType(data)) {
//     for (const subProp of getPublicProperties(data)) {
//       setPropertyRecursive(obj[prop], subProp, data[subProp]);
//     }
//   }
//   setReadOnlyProperty(obj, prop, data);
// }
//# sourceMappingURL=prop-handlers.js.map