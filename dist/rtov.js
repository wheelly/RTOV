"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const AJV = require("ajv");
const lib_1 = require("./lib");
/*
    This is a class decorator the instances of which you want to validate runtime
 */
function validate(constructorFunction) {
    const addSetters = (ajv, obj, args) => {
        for (const key in obj) {
            if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                addSetters(ajv, obj[key], args[key]);
            }
            const metaData = Reflect.getMetadata("validation", obj, key);
            if (metaData && Object.keys(metaData).length) {
                const { className, schema } = metaData;
                const schemaId = className + ':' + key;
                lib_1.debug(() => `@validate -> Adding ${schemaId} schema: ${JSON.stringify(schema)}`);
                ajv.addSchema({ "$id": schemaId, ...schema });
                const propValidator = (data) => {
                    const validate = ajv.getSchema(schemaId);
                    if (validate && !validate(data)) {
                        throw new Error(JSON.stringify(validate.errors));
                    }
                };
                propValidator(args[key]); //validate on construction
                obj.__defineSetter__(key, propValidator);
            }
        }
    };
    //new constructor function
    let newConstructorFunction = function (args, extra) {
        //overriding constructor - setters instead of properties
        let func = function () {
            let obj = new constructorFunction(args, extra);
            const ajv = new AJV({ allErrors: true });
            addSetters(ajv, obj, args);
            return obj;
        };
        func.prototype = constructorFunction.prototype;
        return new func();
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
//# sourceMappingURL=rtov.js.map