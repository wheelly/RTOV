import {expect} from 'chai';
import { CurrencyType, EmbeddedObject, ObjectData } from "./data";

describe('EmbeddedObject Valid Data', function () {

  it('Validate correct data assignment in embedded object', function () {
    const user = new EmbeddedObject<ObjectData>({
      id: 2,
      data: {currency: "ILS", name: "Boris", surname: "Kolesnikov"}
    }, ObjectData);

    const currency : CurrencyType = "USD";
    const newData = {currency, name: "Imgo", surname: "Burner"}
    user.data = newData;
    expect(user.data).to.deep.equal(newData);
  });

  it('Validate correct data assignment in embedded object  property', function () {
    const user = new EmbeddedObject<ObjectData>({
      id: 2,
      data: {currency: "ILS", name: "Boris", surname: "Kolesnikov"}
    }, ObjectData);

    user.data.currency = "USD";
    expect(user.data.currency).to.equal("USD");
  });


});