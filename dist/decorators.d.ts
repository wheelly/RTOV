import 'reflect-metadata';
export declare function validate<T extends {
    new (...constructorArgs: any[]): any;
}>(constructorFunction: T): any;
export declare function property(schema: Object): (target: any, propertyKey: string) => void;
