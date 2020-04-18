export declare type SchemaItemType = "number" | "integer" | "string" | "boolean" | "array" | "object" | "null";
export interface MetaData {
    className: string;
    schema: Object;
}
export interface SchemaOfArray {
    type: 'array';
    items: {
        type: SchemaItemType;
    }[];
}
export declare const isComplexType: (data: any) => boolean;
