export interface RTOVConstructor {
  new(...args: any[]): any;
}

export interface RTOVGenericConstructor<T> {
  new(...args: any[]): T;
}

export interface ExternCtorPosition {
  "extern" : 1|2|3|4|5|6|7|8|9
}
