"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debugOn = process.env.DEBUG && process.env.DEBUG == '1';
exports.debug = debugOn ? (data) => {
    if (typeof data === 'function') {
        console.log(data());
    }
    else {
        console.log(data);
    }
} : () => undefined;
//# sourceMappingURL=debug.js.map