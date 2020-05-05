export declare type SchemaItemType = "number" | "integer" | "string" | "boolean" | "array" | "object" | "null";
export interface MetaData {
    className: string;
    schema: Object;
}
export declare type SchemaUnionType = {
    [union in "oneOf" | "anyOf" | "allOf"]: any[];
};
export interface SchemaOfArray {
    type: 'array';
    items: {
        type: SchemaItemType;
    }[] | SchemaUnionType;
}
export declare const isComplexType: (value: any) => boolean;
