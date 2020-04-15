import 'reflect-metadata';
import * as AJV from "ajv";

import {debug} from "./lib";

export const getSchema = (object: Object): Object | void => {
  if (object.hasOwnProperty("getSchema") && typeof (object as any).getSchema === 'function') {
    //@ts-ignore
    return object.getSchema();
  }
}

interface MetaData {
  className: string
  schema: Object
}

/*
    This is a class decorator the instances of which you want to validate runtime
 */
export function validate<T extends { new(...constructorArgs: any[]): any }>(constructorFunction: T) {

  const addSetters = (ajv: AJV.Ajv, obj: any, args: any) => {

      const getPropName = (name: string) => "__" + name;

      let properties : any = {};

    for (const prop of Object.getOwnPropertyNames(obj)) {
      const metaData: MetaData | void = Reflect.getMetadata("validation", obj, prop);
      if (metaData && Object.keys(metaData).length) {
        const {className, schema} = metaData;
        const isComplexType = typeof obj[prop] === 'object';

        if ( isComplexType ) {
          const embeddedProperties = addSetters(ajv, obj[prop], args[prop]);
          properties[prop] = { ...schema, required: Object.keys(embeddedProperties), properties: embeddedProperties };
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
  let newConstructorFunction: any = function (args : T, extra?: any[]) {
    //overriding constructor - setters instead of properties
    let schema = {};
    let func: any = function () {
      let obj = new constructorFunction(args, extra);
      const ajv: AJV.Ajv = new AJV({allErrors: true});
      const properties = addSetters(ajv, obj, args);
      schema = { type: "object", required: Object.keys(properties), properties };
      return obj;
    }
    func.prototype = constructorFunction.prototype;

    const obj =  new func();
    obj.getSchema = () : Object => { return schema }
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
    Reflect.defineMetadata("validation", { className, schema } , target, propertyKey);
  }
}
