import {validate, property} from "../../RTOV";
import { ModelConstructor } from "./common";

@validate
export class ExampleUser<T extends {}> {

  @property({
    type: "number", minimum: 1
  })
  id: number = 0;

  organization: string = "";

  @property({
    type: "object",
  })
  data : T;

  constructor(args : Partial<ExampleUser<T>>, embeddedConstructor: ModelConstructor<T>) {
    // mandatory here to validate embedded data
    this.data = new embeddedConstructor(args.data);
  }

}
