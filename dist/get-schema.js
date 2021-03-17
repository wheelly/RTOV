"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("./lib");
exports.getSchema = (object) => {
    if (!object.hasOwnProperty(lib_1.getPropName("schema"))) {
        throw Error("This is not a RTOV instance - cannot get openapi schema");
    }
    return object[lib_1.getPropName("schema")];
};
//# sourceMappingURL=get-schema.js.map