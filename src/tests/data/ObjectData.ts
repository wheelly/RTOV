import {validate, property} from "../../RTOV";

export type CurrencyType = "ILS" | "EUR" | "USD" | "ANY"

@validate
export class ObjectData {
  @property({
    type: "string",
    enum: ["ILS", "EUR", "USD"]
  })
  currency: CurrencyType  = "ILS"

  @property({type: "string"})
  name: string = ""

  @property({type: "string"})
  surname: string = ""

  description?: any;

  constructor(args : ObjectData) {}

}