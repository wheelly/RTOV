import 'reflect-metadata';
import * as AJV from "ajv";
import {getPropName, setReadOnlyProperty, addObjectSetters, debug} from "./lib";

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

  //new constructor function
  let newConstructorFunction: any = function (args: T, extra?: any[]) {
    //overriding constructor - setters instead of properties
    let schema = {};
    let func: any = function () {
      let obj = new constructorFunction(args, extra);
      const ajv: AJV.Ajv = new AJV({allErrors: true});
      const properties = addObjectSetters(ajv, obj, args);
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
