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
  let newConstructorFunction: any = function (args: T, embeddedConstructor?: any[]) {
    //overriding constructor - setters instead of properties
    let schema = {};
    let func: any = function () {
      /*
        pseudo constructor, creates object without initializing the properties from args
        embeddedConstructor allows for calling constructor of embedded class to validate it through the parent
        provided embedded has @validate decorator above it
        Example:

        @validate
        export class EmbeddedObject<T extends {}> {
          @property({
            type: "object",
          })
          data : Partial<T>;
          constructor(args : Partial<EmbeddedObject<T>>, embeddedConstructor: ModelConstructor<T>) {
            // mandatory here to validate embedded data
            this.data = new embeddedConstructor(args.data); //this will be validated as well
          }
        }
      TODO: find a way to validate embedded class objects automatically
      */
      let obj = new constructorFunction(args, embeddedConstructor);
      const ajv: AJV.Ajv = new AJV({allErrors: true});
      //that's why we need to put here args again
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
