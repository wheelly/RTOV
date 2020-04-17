import {MetaData, setValidator} from "./lib";
import * as AJV from "ajv";

type ItemType = "number" | "integer" |  "string" | "boolean" | "array" | "object" | "null"

class IndexType<T> {
  [index: number] : T
}

export class RtOVArray<T> extends IndexType<T>{
  constructor(items: T[], private metaData: MetaData, private ajv: AJV.Ajv = new AJV({allErrors: true})) {
    super()
    const itemMeta = this.itemsMetaData();

    for ( let i = 0;  i < items.length; i++) {
      this.addProperty(i.toString(), items[i]);
      setValidator(this.ajv, itemMeta, this, items[i], i.toString());
    }
    this.addProperty('length', items.length);
  }

  toJSON() {
    return Array.from(this as any);
  }

  private itemsMetaData()  {
    const items = (this.metaData.schema as any).items as ItemType[];
    if ( ! items || ! items.length ) {
      throw Error("No items for array validation");
    }
    return { className: this.metaData.className + ':' + this.constructor.name, schema: { oneOf: items }}
  }

  private addProperty(name: string, value: any) {
    Object.defineProperty(this, name, {
      value,
      writable: false,
      configurable: true //let it be redefined
    });
  }

}