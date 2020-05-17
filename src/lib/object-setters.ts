import * as AJV from "ajv";
import {
  getPropName,
  getPublicProperties,
  debug,
  MetaData,
  SchemaOfArray, setReadOnlyProperty,
} from "./";

import {RtOVArray, getSchema, RTOVConstructor} from "../RTOV";

export const setValidator = (ajv: AJV.Ajv, externalCtors: RTOVConstructor[], metaData: MetaData, obj: any, data: any, prop: string) => {
  let schemaProperties: any = {}
  const {className, schema, objectConstructor} = metaData;

  if (objectConstructor) {

    if (objectConstructor === "extern") {
      if ( externalCtors.length === 0) {
        throw new Error('No external constructor passed as argument to your class constructor');
      }
      const externalCtor = externalCtors.shift() as RTOVConstructor;
      obj[prop] = new externalCtor(data);
    } else {
      //this is the call to embedded class constructor
      obj[prop] = new objectConstructor(data);
    }
    schemaProperties[prop] = {...schema, ...getSchema(obj[prop])};
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

    if (Array.isArray(obj[prop])) {
      debug(() => 'Array with type array in schema converting to RtOVArray');
      if (schemaOfArray.type && schemaOfArray.type !== 'array') {
        throw new Error('Incorrect schema type -> must be "array"');
      }
      setReadOnlyProperty(obj, prop, new RtOVArray<any>(data, metaData, ajv));
    } else {

      setReadOnlyProperty(obj, prop, data);
    }
  };

  /*
    1. Instance property if we have a objectConstructor
    2. Otherwise data (args) if any or default value from obj[prop]
    *** Default values are constructed in decorator.ts -> let obj = new constructorFunction();
   */
  const getData = (): any => objectConstructor ? obj[prop] : data || obj[prop];

  //when instancing we need to call here propValidator (then it will be called on assignment as a setter)
  propValidator(getData()); //validate on construction
  obj.__defineSetter__(prop, propValidator);
  obj.__defineGetter__(prop, () => obj[getPropName(prop)]);
  return schemaProperties;
}


export const addObjectSetters = (ajv: AJV.Ajv, externalCtors: RTOVConstructor[], obj: any, args: any) => {

  const getMetadata = (obj: any, prop: string) => {
    const metaData: MetaData | void = Reflect.getMetadata("validation", obj, prop);
    return metaData && Object.keys(metaData).length ? metaData : undefined;
  };

  let schemaProperties: any = {};

  for (const prop of getPublicProperties(obj)) {
    const metaData = getMetadata(obj, prop);
    if (metaData) {
      schemaProperties = {...schemaProperties, ...setValidator(ajv, externalCtors, metaData, obj, args[prop], prop)};
    }
  }
  return schemaProperties;

};
