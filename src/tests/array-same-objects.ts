import {EmbeddedArraySameObjects} from "./data";
import {getSchema} from "../get-schema";

describe('Array same objects', function () {

  it('Same object as embedded array items', function () {
    const user = new EmbeddedArraySameObjects({
      id: 2,
      elems: [{currency: "ILS", name: "Boris", surname: "Kolesnikov"}]
    });

    console.log(JSON.stringify(user))
    console.log(JSON.stringify(getSchema(user)));
  });


});