import {expect} from 'chai';
import {CurrencyType, GenericEmbeddedObject, ObjectData, EmbeddedSimpleArray} from "./data";

describe('Generic Valid Data', function () {

  it('Generic validate correct data assignment in embedded object', function () {
    const user = new GenericEmbeddedObject<ObjectData>({
      id: 2,
      definitions: { def: 1 },
      finally: {"test" :"finally"},
      data: {currency: "ILS", name: "Boris", surname: "Kolesnikov"}
    }, ObjectData);

    const currency : CurrencyType = "USD";
    const newData = {currency, name: "Imgo", surname: "Burner"}
    user.data = newData;
    console.log(JSON.stringify(user));
    expect(user.definitions).to.deep.equal({def: 1})
    expect(user.booleanFieldDefault).to.equal(false);
    expect(user.data).to.deep.equal(newData);
    expect(user.finally).to.deep.equal({"test" :"finally"});
  });

  it('Generic validate correct embedded object with array', function () {
    const user = new GenericEmbeddedObject<EmbeddedSimpleArray>({
      id: 2,
      definitions: { def: 1 },
      finally: {"test" :"finally"},
      data: {id: 2, data: ["Boris"]}
    }, EmbeddedSimpleArray);

    console.log(JSON.stringify(user));
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