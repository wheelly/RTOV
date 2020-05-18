"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const RTOV_1 = require("../RTOV");
exports.setValidator = (ajv, externalCtors, metaData, obj, data, prop) => {
    let schemaProperties = {};
    const { className, schema, objectConstructor } = metaData;
    if (objectConstructor) {
        if (objectConstructor.extern) {
            //beginning with 1 in meta not to confuse it with zero position arguments of class data itself
            _1.debug(() => `Extern constructor at arg position ${JSON.stringify(objectConstructor)}`);
            const ctorArgPos = objectConstructor.extern - 1;
            if (ctorArgPos >= externalCtors.length) {
                throw new Error(`No external constructor mapped to position ${ctorArgPos + 1} passed as argument to your class constructor`);
            }
            obj[prop] = new externalCtors[ctorArgPos](data);
        }
        else {
            //this is the call to embedded class constructor
            obj[prop] = new objectConstructor(data);
        }
        schemaProperties[prop] = { ...schema, ...RTOV_1.getSchema(obj[prop]) };
    }
    else {
        schemaProperties[prop] = schema;
    }
    const schemaId = className + ':' + prop;
    _1.debug(() => `@validate -> Adding ${schemaId} schema: ${JSON.stringify(schemaProperties[prop])}`);
    ajv.addSchema({ "$id": schemaId, ...schemaProperties[prop] });
    const propValidator = (data) => {
        const validate = ajv.getSchema(schemaId);
        if (validate && !validate(data)) {
            throw new Error(`[${prop}]=${JSON.stringify(validate.errors)}`);
        }
        const schemaOfArray = schema;
        if (Array.isArray(obj[prop])) {
            _1.debug(() => 'Array with type array in schema converting to RtOVArray');
            if (schemaOfArray.type && schemaOfArray.type !== 'array') {
                throw new Error('Incorrect schema type -> must be "array"');
            }
            _1.setReadOnlyProperty(obj, prop, new RTOV_1.RtOVArray(data, metaData, ajv));
        }
        else {
            _1.setReadOnlyProperty(obj, prop, data);
        }
    };
    /*
      1. Instance property if we have a objectConstructor
      2. Otherwise data (args) if any or default value from obj[prop]
      *** Default values are constructed in decorator.ts -> let obj = new constructorFunction();
     */
    const getData = () => objectConstructor ? obj[prop] : data || obj[prop];
    //when instancing we need to call here propValidator (then it will be called on assignment as a setter)
    propValidator(getData()); //validate on construction
    obj.__defineSetter__(prop, propValidator);
    obj.__defineGetter__(prop, () => obj[_1.getPropName(prop)]);
    return schemaProperties;
};
exports.addObjectSetters = (ajv, externalCtors, obj, args) => {
    const getMetadata = (obj, prop) => {
        const metaData = Reflect.getMetadata("validation", obj, prop);
        return metaData && Object.keys(metaData).length ? metaData : undefined;
    };
    let schemaProperties = {};
    const argsPropSet = new Set(Object.getOwnPropertyNames(args));
    for (const prop of _1.getPublicProperties(obj)) {
        const metaData = getMetadata(obj, prop);
        if (metaData) {
            schemaProperties = { ...schemaProperties, ...exports.setValidator(ajv, externalCtors, metaData, obj, args[prop], prop) };
        }
        else if (args.hasOwnProperty(prop)) { //for all other properties in args that are not under @property decorator
            obj[prop] = args[prop];
        }
        argsPropSet.delete(prop);
    }
    //properties of args that does not exist in object (like class F { some?: Object } )
    for (const prop of argsPropSet) {
        obj[prop] = args[prop];
    }
    return schemaProperties;
};
//# sourceMappingURL=object-setters.js.map