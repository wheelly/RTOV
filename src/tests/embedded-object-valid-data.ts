import {expect} from 'chai';
import { CurrencyType, EmbeddedObject } from "./data";

describe('EmbeddedObject Valid Data', function () {

  it('Validate correct data assignment in embedded object', function () {
    const user = new EmbeddedObject({
      id: 2,
      definitions: { def: 1 },
      data: {currency: "ILS", name: "Boris", surname: "Kolesnikov"}
    });

    const currency : CurrencyType = "USD";
    const newData = {currency, name: "Imgo", surname: "Burner"}
    user.data = newData;
    console.log(JSON.stringify(user));
    expect(user.definitions).to.deep.equal({def: 1})
    expect(user.booleanFieldDefault).to.equal(false);
    expect(user.data).to.deep.equal(newData);
  });

  it('Validate correct data assignment in embedded object property', function () {
    const user = new EmbeddedObject({
      id: 2,
      data: {currency: "ILS", name: "Boris", surname: "Kolesnikov"}
    });

    user.data.currency = "USD";
    expect(user.data.currency).to.equal("USD");
  });


});