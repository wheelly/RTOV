"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const AJV = require("ajv");
const lib_1 = require("./lib");
exports.getSchema = (object) => {
    if (object.hasOwnProperty(lib_1.getPropName("schema"))) {
        //@ts-ignore
        return object[lib_1.getPropName("schema")];
    }
};
/*
    This is a class decorator the instances of which you want to validate runtime
 */
function validate(constructorFunction) {
    //new constructor function
    let newConstructorFunction = function (args, extra) {
        //overriding constructor - setters instead of properties
        let schema = {};
        let func = function () {
            let obj = new constructorFunction(args, extra);
            const ajv = new AJV({ allErrors: true });
            const properties = lib_1.addObjectSetters(ajv, obj, args);
            schema = { type: "object", required: Object.keys(properties), properties };
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
function property(schema) {
    return function addValidationRule(target, propertyKey) {
        const className = target.constructor.name;
        lib_1.debug(() => `@property -> ${className}.${propertyKey} schema: ${JSON.stringify(schema)}`);
        Reflect.defineMetadata("validation", { className, schema }, target, propertyKey);
    };
}
exports.property = property;
//# sourceMappingURL=decorators.js.map