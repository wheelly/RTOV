import * as AJV from "ajv";
import {
  getPropName,
  setPropertyRecursive,
  isComplexType,
  getPublicProperties,
  addItemsSetters,
  debug,
  MetaData
} from "./";

export const addObjectSetters = (ajv: AJV.Ajv, obj: any, args: any) => {

  const getMetadata = (obj: any, prop: string) => {
    const metaData: MetaData | void = Reflect.getMetadata("validation", obj, prop);
    return metaData && Object.keys(metaData).length ? metaData : undefined;
  };

  let properties: any = {};

  for (const prop of getPublicProperties(obj)) {
    const metaData = getMetadata(obj, prop);
    if (metaData) {
      const {className, schema} = metaData;

      if (isComplexType(obj[prop])) {
        if (Array.isArray(obj[prop])) {
          addItemsSetters(ajv, obj[prop], args[prop], metaData);
          properties[prop] = schema;
        } else {
          const embeddedProperties = addObjectSetters(ajv, obj[prop], args[prop]);
          properties[prop] = {...schema, required: Object.keys(embeddedProperties), properties: embeddedProperties};
        }
      } else {
        properties[prop] = schema;
      }

      const schemaId = className + ':' + prop
      debug(() => `@validate -> Adding ${schemaId} schema: ${JSON.stringify(properties[prop])}`);
      ajv.addSchema({"$id": schemaId, ...properties[prop]});

      const propValidator = (data: any) => {
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
