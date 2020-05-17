import 'reflect-metadata';
import * as AJV from "ajv";
import {setReadOnlyProperty, addObjectSetters, debug} from "./lib";
import {RTOVConstructor} from "./constructor";


/*
    This is a class decorator the instances of which you want to validate runtime
 */
export function validate<T extends { new(...constructorArgs: any[]): any }>(constructorFunction: T) {

  //new constructor function
  let newConstructorFunction: any = function (...constructorArgs: any[]) {
    //overriding constructor - setters instead of properties
    let schema = {};
    let externalCtors : RTOVConstructor[] = []
    let func: any = function () {
      //collecting all args
      let args : any = {}
      for ( const itemArgs of constructorArgs ) {
        if ( typeof itemArgs === 'function' && itemArgs.prototype.constructor.toString().startsWith('class') ) {
          externalCtors.push(itemArgs);
        } else {
          args = {...itemArgs, ...args};
        }
      }

      //to construct default values and enable Reflect.metadata annotations we need to invoke constructor
      let obj = new constructorFunction();
      const ajv: AJV.Ajv = new AJV({allErrors: true});
      //that's why we need to put here args again
      const properties = addObjectSetters(ajv, externalCtors, obj, args);
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
export function property(schema: Object, objectConstructor?: RTOVConstructor | "extern") {
  return function addValidationRule(target: any, propertyKey: string) {
    const className = target.constructor.name;
    debug(() => `@property -> ${className}.${propertyKey} schema: ${JSON.stringify(schema)}`);
    Reflect.defineMetadata("validation", {className, schema, objectConstructor}, target, propertyKey);
  }
}
