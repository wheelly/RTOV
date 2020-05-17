export interface RTOVConstructor {
  new(...args: any[]): any;
}

export interface RTOVGenericConstructor<T> {
  new(...args: any[]): T;
}
