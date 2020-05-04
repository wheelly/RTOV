
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


export const isComplexType = (data: any) => data !== null && typeof data === 'object';