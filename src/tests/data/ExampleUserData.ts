import {validate, property} from "../../rtov";

@validate
export class ExampleUserData {
  @property({
    type: "string",
    enum: ["ILS", "EUR", "USD"]
  })
  currency: "ILS" | "EUR" | "USD" | "ANY" = "ILS"

  @property({type: "string"})
  name: string = ""

  @property({type: "string"})
  surname: string = ""

  description?: any;

}