"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const AJV = require("ajv");
const lib_1 = require("./lib");
exports.getSchema = (object) => {
    if (object.hasOwnProperty("getSchema") && typeof object.getSchema === 'function') {
        //@ts-ignore
        return object.getSchema();
    }
};
/*
    This is a class decorator the instances of which you want to validate runtime
 */
function validate(constructorFunction) {
    const addSetters = (ajv, obj, args) => {
        const getPropName = (name) => "__" + name;
        let properties = {};
        for (const prop of Object.getOwnPropertyNames(obj)) {
            const metaData = Reflect.getMetadata("validation", obj, prop);
            if (metaData && Object.keys(metaData).length) {
                const { className, schema } = metaData;
                const isComplexType = typeof obj[prop] === 'object';
                if (isComplexType) {
                    const embeddedProperties = addSetters(ajv, obj[prop], args[prop]);
                    properties[prop] = { ...schema, required: Object.keys(embeddedProperties), properties: embeddedProperties };
                }
                else {
                    properties[prop] = schema;
                }
                const schemaId = className + ':' + prop;
                lib_1.debug(() => `@validate -> Adding ${schemaId} schema: ${JSON.stringify(properties[prop])}`);
                ajv.addSchema({ "$id": schemaId, ...properties[prop] });
                const propValidator = (data) => {
                    const validate = ajv.getSchema(schemaId);
                    if (validate && !validate(data)) {
                        throw new Error(JSON.stringify(validate.errors));
                    }
                    Object.defineProperty(obj, getPropName(prop), {
                        value: isComplexType ? obj[prop] : args[prop],
                        writable: false
                    });
                };
                propValidator(args[prop]); //validate on construction
                obj.__defineSetter__(prop, propValidator);
                obj.__defineGetter__(prop, () => obj[getPropName(prop)]);
            }
        }
        return properties;
    };
    //new constructor function
    let newConstructorFunction = function (args, extra) {
        //overriding constructor - setters instead of properties
        let schema = {};
        let func = function () {
            let obj = new constructorFunction(args, extra);
            const ajv = new AJV({ allErrors: true });
            const properties = addSetters(ajv, obj, args);
            schema = { type: "object", required: Object.keys(properties), properties };
            return obj;
        };
        func.prototype = constructorFunction.prototype;
        const obj = new func();
        obj.getSchema = () => { return schema; };
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