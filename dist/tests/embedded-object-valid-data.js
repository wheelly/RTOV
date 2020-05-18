"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const data_1 = require("./data");
describe('EmbeddedObject Valid Data', function () {
    it('Validate correct data assignment in embedded object', function () {
        const user = new data_1.EmbeddedObject({
            id: 2,
            definitions: { def: 1 },
            data: { currency: "ILS", name: "Boris", surname: "Kolesnikov" }
        });
        const currency = "USD";
        const newData = { currency, name: "Imgo", surname: "Burner" };
        user.data = newData;
        console.log(JSON.stringify(user));
        chai_1.expect(user.definitions).to.deep.equal({ def: 1 });
        chai_1.expect(user.booleanFieldDefault).to.equal(false);
        chai_1.expect(user.data).to.deep.equal(newData);
    });
    it('Validate correct data assignment in embedded object property', function () {
        const user = new data_1.EmbeddedObject({
            id: 2,
            data: { currency: "ILS", name: "Boris", surname: "Kolesnikov" }
        });
        user.data.currency = "USD";
        chai_1.expect(user.data.currency).to.equal("USD");
    });
});
//# sourceMappingURL=embedded-object-valid-data.js.map