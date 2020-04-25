import {MetaData, setValidator, SchemaUnionType, SchemaOfArray} from "./lib";
import * as AJV from "ajv";

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
    const items = (this.metaData.schema as SchemaOfArray).items;
    if ( ! items || ! Object.keys(items).length ) {
      throw Error("No items for array validation");
    }
    //this is ajv type checking for each property of the array - should satisfy any of because it one item
    const propertyPossibleTypes = (() => {
      //TODO: if all of we must re-invoke somehow validation of the whole array from the main object again
      for ( const unionType  of [ "allOf", "anyOf", "oneOf" ] ) {
        const unionTypeValue = ( items as SchemaUnionType)[unionType as "allOf" | "anyOf" | "oneOf"]
        if ( unionTypeValue ) {
          if (! Array.isArray(unionTypeValue) ) {
            throw new Error(`Array expected. Got ${unionTypeValue}`);
          }
          return unionTypeValue;
        }
      }
      return items;
    })()
    return { className: this.metaData.className + ':' + this.constructor.name, schema: { anyOf: propertyPossibleTypes } }
  }

  private addProperty(name: string, value: any) {
    Object.defineProperty(this, name, {
      value,
      writable: false,
      configurable: true //let it be redefined
    });
  }

}