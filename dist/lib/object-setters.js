"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const RTOV_1 = require("../RTOV");
exports.setValidator = (ajv, metaData, obj, newValue, prop) => {
    let schemaProperties = {};
    const { className, schema } = metaData;
    if (_1.isComplexType(obj[prop]) && !Array.isArray(obj[prop])) {
        const embeddedProperties = exports.addObjectSetters(ajv, obj[prop], newValue);
        schemaProperties[prop] = { ...schema, required: Object.keys(embeddedProperties), properties: embeddedProperties };
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
        if (Array.isArray(obj[prop]) && schemaOfArray.type && schemaOfArray.type === 'array') {
            _1.debug(() => 'Array with type array in schema converting to RtOVArray');
            _1.setReadOnlyProperty(obj, prop, new RTOV_1.RtOVArray(data, metaData, ajv));
        }
        else {
            _1.setPropertyRecursive(obj, prop, data);
        }
    };
    //default values from constructor processed here
    propValidator(newValue === undefined ? obj[prop] : newValue); //validate on construction
    obj.__defineSetter__(prop, propValidator);
    obj.__defineGetter__(prop, () => obj[_1.getPropName(prop)]);
    return schemaProperties;
};
exports.addObjectSetters = (ajv, obj, args) => {
    const getMetadata = (obj, prop) => {
        const metaData = Reflect.getMetadata("validation", obj, prop);
        return metaData && Object.keys(metaData).length ? metaData : undefined;
    };
    let schemaProperties = {};
    for (const prop of _1.getPublicProperties(obj)) {
        const metaData = getMetadata(obj, prop);
        if (metaData) {
            schemaProperties = Object.assign(schemaProperties, exports.setValidator(ajv, metaData, obj, args[prop], prop));
        }
    }
    return schemaProperties;
};
//# sourceMappingURL=object-setters.js.map