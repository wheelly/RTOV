import 'reflect-metadata';
import * as AJV from "ajv";

import { debug} from "./lib";

interface MetaData {
  className: string
  schema: Object
}

/*
    This is a class decorator the instances of which you want to validate runtime
 */
export function validate<T extends { new(...constructorArgs: any[]): any }>(constructorFunction: T) {

  const addSetters = (ajv: AJV.Ajv, obj: any, args: any) => {
    for (const key in obj) {
      if ( typeof obj[key] === 'object' && ! Array.isArray(obj[key])) {
        addSetters(ajv, obj[key], args[key]);
      }
      const metaData: MetaData | void = Reflect.getMetadata("validation", obj, key);
      if (metaData && Object.keys(metaData).length) {
        const {className, schema} = metaData;
        const schemaId = className + ':' + key
        debug(() => `@validate -> Adding ${schemaId} schema: ${JSON.stringify(schema)}`);
        ajv.addSchema({"$id": schemaId, ...schema});
        const propValidator = (data: any) => {
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
  let newConstructorFunction: any = function (args : T, extra?: any[]) {
    //overriding constructor - setters instead of properties
    let func: any = function () {
      let obj = new constructorFunction(args, extra);
      const ajv: AJV.Ajv = new AJV({allErrors: true});
      addSetters(ajv, obj, args);
      return obj;
    }
    func.prototype = constructorFunction.prototype;
    return new func();
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
