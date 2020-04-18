
export type SchemaItemType = "number" | "integer" |  "string" | "boolean" | "array" | "object" | "null"

export interface MetaData {
  className: string;
  schema: Object;
}

export interface SchemaOfArray {
  type: 'array';
  items: {type: SchemaItemType}[]
}


export const isComplexType = (data: any) => typeof data === 'object';