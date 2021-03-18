import {getPropName} from "./lib";

export const getSchema = (object: {[name: string] : any}): any => {
  if (! object.hasOwnProperty(getPropName("schema"))) {
    throw Error("This is not a RTOV instance - cannot get openapi schema");
  }
 return object[getPropName("schema")];
}