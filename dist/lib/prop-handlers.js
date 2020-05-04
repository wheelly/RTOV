"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
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
exports.setPropertyRecursive = (obj, prop, data) => {
    if (index_1.isComplexType(obj[prop]) && !Array.isArray(obj[prop])) {
        Object.assign(obj[prop], data); //initialization!!!!
        for (const subProp of exports.getPublicProperties(obj[prop])) {
            exports.setPropertyRecursive(obj[prop], subProp, data[subProp]);
        }
        exports.setReadOnlyProperty(obj, prop, obj[prop]);
    }
    else {
        exports.setReadOnlyProperty(obj, prop, data);
    }
};
//# sourceMappingURL=prop-handlers.js.map