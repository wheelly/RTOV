import 'reflect-metadata';
import * as AJV from "ajv";
import {MetaData, addItemsSetters, debug} from "./lib";

const PROP_PREFIX = "__";

const getPropName = (name: string) => PROP_PREFIX + name;

export const getSchema = (object: Object): Object | void => {
  if (object.hasOwnProperty(getPropName("schema"))) {
    //@ts-ignore
    return object[getPropName("schema")];
  }
}


/*
    This is a class decorator the instances of which you want to validate runtime
 */
export function validate<T extends { new(...constructorArgs: any[]): any }>(constructorFunction: T) {

  const isComplexType = (data: any) => typeof data === 'object';

  const setReadOnlyProperty = (obj: any, prop: string, data: any) => {
    Object.defineProperty(obj, getPropName(prop), {
      value: data,
      writable: false,
      configurable: true //let it be redefined
    });
  }

  const getPublicProperties = (obj: any) => Object.getOwnPropertyNames(obj).filter((prop) => !prop.startsWith(PROP_PREFIX));

  const setPropertyRecursive = (obj: any, prop: string, data: any) => {
    if (isComplexType(obj[prop])) {
      for (const subProp of getPublicProperties(obj[prop])) {
        setPropertyRecursive(obj[prop], subProp, data[subProp]);
      }
      setReadOnlyProperty(obj, prop, obj[prop]);
    } else {
      setReadOnlyProperty(obj, prop, data);
    }
  }

  const addSetters = (ajv: AJV.Ajv, obj: any, args: any) => {

    const getMetadata = (obj : any, prop: string) => {
      const metaData: MetaData | void = Reflect.getMetadata("validation", obj, prop);
      return metaData && Object.keys(metaData).length ? metaData : undefined;
    };

    let properties: any = {};

    for (const prop of getPublicProperties(obj)) {
      const metaData = getMetadata(obj, prop);
      if ( metaData ) {
        const {className, schema} = metaData;

        if (isComplexType(obj[prop])) {
          if ( Array.isArray(obj[prop]) ) {
            addItemsSetters(ajv, obj[prop], args[prop], metaData);
            properties[prop] = schema;
          } else {
            const embeddedProperties = addSetters(ajv, obj[prop], args[prop]);
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

  //new constructor function
  let newConstructorFunction: any = function (args: T, extra?: any[]) {
    //overriding constructor - setters instead of properties
    let schema = {};
    let func: any = function () {
      let obj = new constructorFunction(args, extra);
      const ajv: AJV.Ajv = new AJV({allErrors: true});
      const properties = addSetters(ajv, obj, args);
      schema = {type: "object", required: Object.keys(properties), properties};
      return obj;
    }
    func.prototype = constructorFunction.prototype;

    const obj = new func();
    setReadOnlyProperty(obj, 'schema', schema);
    return obj;
  }
  newConstructorFunction.prototype = constructorFunction.prototype;
  return newConstructorFunction;


}

/*
    This is property of object to be validated
 */
export function property(schema: Object) {
  return function addValidationRule(target: any, propertyKey: string) {
    const className = target.constructor.name;
    debug(() => `@property -> ${className}.${propertyKey} schema: ${JSON.stringify(schema)}`);
    Reflect.defineMetadata("validation", {className, schema}, target, propertyKey);
  }
}
