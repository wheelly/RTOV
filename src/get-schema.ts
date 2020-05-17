import {getPropName} from "./lib";

export const getSchema = (object: Object): Object | void => {
  if (object.hasOwnProperty(getPropName("schema"))) {
    //@ts-ignore
    return object[getPropName("schema")];
  }
}