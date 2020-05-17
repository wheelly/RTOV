import {expect} from 'chai';
import { CurrencyType, GenericEmbeddedObject, ObjectData } from "./data";

describe('Generic Valid Data', function () {

  it('Generic validate correct data assignment in embedded object', function () {
    const user = new GenericEmbeddedObject<ObjectData>({
      id: 2,
      definitions: { def: 1 },
      data: {currency: "ILS", name: "Boris", surname: "Kolesnikov"}
    }, ObjectData);

    const currency : CurrencyType = "USD";
    const newData = {currency, name: "Imgo", surname: "Burner"}
    user.data = newData;
    console.log(JSON.stringify(user));
    expect(user.definitions).to.deep.equal({def: 1})
    expect(user.booleanFieldDefault).to.equal(false);
    expect(user.data).to.deep.equal(newData);
  });

  it('Generic validate correct data assignment in embedded object  property', function () {
    const user = new GenericEmbeddedObject<ObjectData>({
      id: 2,
      data: {currency: "ILS", name: "Boris", surname: "Kolesnikov"}
    }, ObjectData);

    user.data.currency = "USD";
    expect(user.data.currency).to.equal("USD");
  });


});