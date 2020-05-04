import * as AJV from "ajv";
import {
  getPropName,
  setPropertyRecursive,
  isComplexType,
  getPublicProperties,
  debug,
  MetaData,
  SchemaOfArray, setReadOnlyProperty,
} from "./";

import { RtOVArray } from "../RTOV";

export const setValidator = (ajv: AJV.Ajv, metaData: MetaData, obj: any, newValue: any, prop: string) => {
  let schemaProperties : any = {}
  const {className, schema} = metaData;

  if (isComplexType(obj[prop]) && ! Array.isArray(obj[prop])) {
    const embeddedProperties = addObjectSetters(ajv, obj[prop], newValue);
    schemaProperties[prop] = {...schema, required: Object.keys(embeddedProperties), properties: embeddedProperties};
  } else {
    schemaProperties[prop] = schema;
  }

  const schemaId = className + ':' + prop
  debug(() => `@validate -> Adding ${schemaId} schema: ${JSON.stringify(schemaProperties[prop])}`);
  ajv.addSchema({"$id": schemaId, ...schemaProperties[prop]});

  const propValidator = (data: any) => {
    const validate = ajv.getSchema(schemaId);
    if (validate && !validate(data)) {
      throw new Error(`[${prop}]=${JSON.stringify(validate.errors)}`);
    }

    const schemaOfArray = schema as SchemaOfArray;

    if ( Array.isArray(obj[prop]) && schemaOfArray.type && schemaOfArray.type === 'array') {
      debug(() => 'Array with type array in schema converting to RtOVArray');
      setReadOnlyProperty(obj, prop, new RtOVArray<any>(data, metaData, ajv));
    } else {
      setPropertyRecursive(obj, prop, data);
    }
  };

  //default values from constructor processed here
  propValidator(newValue === undefined ? obj[prop] : newValue); //validate on construction
  obj.__defineSetter__(prop, propValidator);
  obj.__defineGetter__(prop, () => obj[getPropName(prop)]);
  return schemaProperties;
}


export const addObjectSetters = (ajv: AJV.Ajv, obj: any, args: any) => {

  const getMetadata = (obj: any, prop: string) => {
    const metaData: MetaData | void = Reflect.getMetadata("validation", obj, prop);
    return metaData && Object.keys(metaData).length ? metaData : undefined;
  };

  let schemaProperties: any = {};

  for (const prop of getPublicProperties(obj)) {
    const metaData = getMetadata(obj, prop);
    if (metaData) {
      schemaProperties = Object.assign(schemaProperties, setValidator(ajv, metaData, obj, args[prop], prop));
    }
  }

  return schemaProperties;

};
