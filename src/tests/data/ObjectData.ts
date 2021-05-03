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

  constructor(args? : ObjectData) {}

}

@validate
export class ObjectDataExt extends ObjectData {
  @property({type: "string", minLength: 5})
  extended: string = "12345"

  @property({type: "string", minLength: 1})
  name: string = "Z"

  constructor(args? : ObjectDataExt) {
    super(args);
  }
}