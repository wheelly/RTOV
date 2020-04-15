import * as AJV from "ajv";
import { MetaData } from "./index";

type ItemType = "number" | "integer" |  "string" | "boolean" | "array" | "object" | "null"

export const addItemsSetters = (ajv: AJV.Ajv, target: any[], items: any[], metaData: MetaData) => {

  const extractItemsValidators = () => {
    const items = (metaData.schema as any).items as ItemType[];
    if ( ! items || ! items.length ) {
      throw Error("No items for array validation");
    }
    return items;
  }

  for ( const elem of items ) {

  }
}

