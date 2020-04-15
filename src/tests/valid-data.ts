import {expect} from 'chai';
import { CurrencyType, ExampleUser, ExampleUserData } from "./data";

describe('ExampleUser Valid Data', function () {

  it('Validate correct data assignment in embedded object', function () {
    const user = new ExampleUser<ExampleUserData>({
      id: 2,
      data: {currency: "ILS", name: "Boris", surname: "Kolesnikov"}
    }, ExampleUserData);

    const currency : CurrencyType = "USD";
    const newData = {currency, name: "Imgo", surname: "Burner"}
    user.data = newData;
    expect(user.data).to.deep.equal(newData);
  });

  it('Validate correct data assignment in embedded object  property', function () {
    const user = new ExampleUser<ExampleUserData>({
      id: 2,
      data: {currency: "ILS", name: "Boris", surname: "Kolesnikov"}
    }, ExampleUserData);

    user.data.currency = "USD";
    expect(user.data.currency).to.equal("USD");
  });


});