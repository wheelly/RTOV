"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const AJV = require("ajv");
const lib_1 = require("./lib");
const PROP_PREFIX = "__";
const getPropName = (name) => PROP_PREFIX + name;
exports.getSchema = (object) => {
    if (object.hasOwnProperty(getPropName("schema"))) {
        //@ts-ignore
        return object[getPropName("schema")];
    }
};
/*
    This is a class decorator the instances of which you want to validate runtime
 */
function validate(constructorFunction) {
    const isComplexType = (data) => typeof data === 'object';
    const setReadOnlyProperty = (obj, prop, data) => {
        Object.defineProperty(obj, getPropName(prop), {
            value: data,
            writable: false,
            configurable: true //let it be redefined
        });
    };
    const getPublicProperties = (obj) => Object.getOwnPropertyNames(obj).filter((prop) => !prop.startsWith(PROP_PREFIX));
    const setPropertyRecursive = (obj, prop, data) => {
        if (isComplexType(obj[prop])) {
            for (const subProp of getPublicProperties(obj[prop])) {
                setPropertyRecursive(obj[prop], subProp, data[subProp]);
            }
            setReadOnlyProperty(obj, prop, obj[prop]);
        }
        else {
            setReadOnlyProperty(obj, prop, data);
        }
    };
    const addSetters = (ajv, obj, args) => {
        const getMetadata = (obj, prop) => {
            const metaData = Reflect.getMetadata("validation", obj, prop);
            return metaData && Object.keys(metaData).length ? metaData : undefined;
        };
        let properties = {};
        for (const prop of getPublicProperties(obj)) {
            const metaData = getMetadata(obj, prop);
            if (metaData) {
                const { className, schema } = metaData;
                if (isComplexType(obj[prop])) {
                    if (Array.isArray(obj[prop])) {
                        lib_1.addItemsSetters(ajv, obj[prop], args[prop], metaData);
                        properties[prop] = schema;
                    }
                    else {
                        const embeddedProperties = addSetters(ajv, obj[prop], args[prop]);
                        properties[prop] = { ...schema, required: Object.keys(embeddedProperties), properties: embeddedProperties };
                    }
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
                    setPropertyRecursive(obj, prop, data);
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
        setReadOnlyProperty(obj, 'schema', schema);
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