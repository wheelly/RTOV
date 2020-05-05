
export type SchemaItemType = "number" | "integer" |  "string" | "boolean" | "array" | "object" | "null"

export interface MetaData {
  className: string;
  schema: Object;
}

export type SchemaUnionType = {
  [union in "oneOf" | "anyOf" | "allOf"]: any[];
};

export interface SchemaOfArray {
  type: 'array';
  items: {type: SchemaItemType}[] | SchemaUnionType
}

export const isComplexType = (value: any) => {
  return typeof value === "object"
    && value !== null
    && !(value instanceof Boolean)
    && !(value instanceof Date)
    && !(value instanceof Number)
    && !(value instanceof RegExp)
    && !(value instanceof String)
}