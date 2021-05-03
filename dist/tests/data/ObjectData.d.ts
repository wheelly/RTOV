export declare type CurrencyType = "ILS" | "EUR" | "USD" | "ANY";
export declare class ObjectData {
    currency: CurrencyType;
    name: string;
    surname: string;
    description?: any;
    constructor(args?: ObjectData);
}
export declare class ObjectDataExt extends ObjectData {
    extended: string;
    name: string;
    constructor(args?: ObjectDataExt);
}
