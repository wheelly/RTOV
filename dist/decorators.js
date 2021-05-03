"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const AJV = require("ajv");
const lib_1 = require("./lib");
/*
    This is a class decorator the instances of which you want to validate runtime
 */
function validate(constructorFunction) {
    //new constructor function
    const newConstructorFunction = function (...constructorArgs) {
        //overriding constructor - setters instead of properties
        let schema = {};
        let externalCtors = [];
        let func = function () {
            //collecting all args
            let args = {};
            for (const itemArgs of constructorArgs) {
                if (typeof itemArgs === 'function' && itemArgs.prototype.constructor.toString().startsWith('class')) {
                    externalCtors.push(itemArgs);
                }
                else {
                    args = { ...itemArgs, ...args };
                }
            }
            //to construct default values and enable Reflect.metadata annotations we need to invoke constructor
            let obj = new constructorFunction();
            const ajv = new AJV({ allErrors: true });
            //that's why we need to put here args again
            const { required, properties } = lib_1.addObjectSetters(ajv, externalCtors, constructorFunction.prototype, obj, args);
            schema = { type: "object", required, properties };
            return obj;
        };
        func.prototype = constructorFunction.prototype;
        const obj = new func();
        lib_1.setReadOnlyProperty(obj, 'schema', schema);
        return obj;
    };
    newConstructorFunction.prototype = constructorFunction.prototype;
    return newConstructorFunction;
}
exports.validate = validate;
/*
    This is property of object to be validated
 */
function property(schema, objectConstructor) {
    return function addValidationRule(target, propertyKey) {
        const className = target.constructor.name;
        lib_1.debug(() => `@property -> ${className}.${propertyKey} schema: ${JSON.stringify(schema)}`);
        Reflect.defineMetadata("validation", { className, schema, objectConstructor }, target, propertyKey);
    };
}
exports.property = property;
//# sourceMappingURL=decorators.js.map