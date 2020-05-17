import {RTOVConstructor, ExternCtorPosition} from "../constructor";

export type SchemaItemType = "number" | "integer" |  "string" | "boolean" | "array" | "object" | "null"

export interface MetaData {
  className: string;
  schema: Object;
  objectConstructor?: RTOVConstructor | ExternCtorPosition;
}

export type SchemaUnionType = {
  [union in "oneOf" | "anyOf" | "allOf"]: any[];
};

export interface SchemaOfArray {
  type: 'array';
  items: {type: SchemaItemType}[] | SchemaUnionType
}

const PROP_PREFIX = "__";

export const getPublicProperties = (obj: any) => Object.getOwnPropertyNames(obj).filter((prop) => !prop.startsWith(PROP_PREFIX));

export const getPropName = (name: string) => PROP_PREFIX + name;

export const setReadOnlyProperty = (obj: any, prop: string, data: any) => {
  Object.defineProperty(obj, getPropName(prop), {
    value: data,
    writable: false,
    configurable: true //let it be redefined
  });
}

// export const isComplexType = (value: any) => {
//   return typeof value === "object"
//     && value !== null
//     && ! Array.isArray(value)
//     && !(value instanceof Boolean)
//     && !(value instanceof Date)
//     && !(value instanceof Number)
//     && !(value instanceof RegExp)
//     && !(value instanceof String)
// }

