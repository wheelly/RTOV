"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const data_1 = require("./data");
describe('Generic Valid Data', function () {
    it('Generic validate correct data assignment in embedded object', function () {
        const user = new data_1.GenericEmbeddedObject({
            id: 2,
            definitions: { def: 1 },
            finally: { "test": "finally" },
            data: { currency: "ILS", name: "Boris", surname: "Kolesnikov" }
        }, data_1.ObjectData);
        const currency = "USD";
        const newData = { currency, name: "Imgo", surname: "Burner" };
        user.data = newData;
        console.log(JSON.stringify(user));
        chai_1.expect(user.definitions).to.deep.equal({ def: 1 });
        chai_1.expect(user.booleanFieldDefault).to.equal(false);
        chai_1.expect(user.data).to.deep.equal(newData);
        chai_1.expect(user.finally).to.deep.equal({ "test": "finally" });
    });
    it('Generic validate correct embedded object with array', function () {
        const user = new data_1.GenericEmbeddedObject({
            id: 2,
            definitions: { def: 1 },
            finally: { "test": "finally" },
            data: { id: 2, data: ["Boris"] }
        }, data_1.EmbeddedSimpleArray);
        console.log(JSON.stringify(user));
    });
    it('Generic validate correct data assignment in embedded object  property', function () {
        const user = new data_1.GenericEmbeddedObject({
            id: 2,
            data: { currency: "ILS", name: "Boris", surname: "Kolesnikov" }
        }, data_1.ObjectData);
        user.data.currency = "USD";
        chai_1.expect(user.data.currency).to.equal("USD");
    });
});
//# sourceMappingURL=generic-embedded-object-valid-data.js.map