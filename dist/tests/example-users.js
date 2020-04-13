"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
const chai_1 = require("chai");
describe('ExampleUser', function () {
    describe('Property Instancing Validation', function () {
        it('validate prop creation - incorrect currency', function () {
            chai_1.assert.throw(() => {
                const user = new data_1.ExampleUser({
                    id: 2,
                    data: { currency: "ANY", name: "Boris", surname: "Kolesnikov" }
                }, data_1.ExampleUserData);
            }, '[{"keyword":"enum","dataPath":"","schemaPath":"#/enum","params":{"allowedValues":["ILS","EUR","USD"]},"message":"should be equal to one of the allowed values"}]');
        });
        it('validate embedded prop access', function () {
            chai_1.assert.throw(() => {
                const user = new data_1.ExampleUser({
                    id: 0,
                    data: { currency: "ILS", name: "Boris", surname: "Kolesnikov" }
                }, data_1.ExampleUserData);
            }, '[{"keyword":"minimum","dataPath":"","schemaPath":"#/minimum","params":{"comparison":">=","limit":1,"exclusive":false},"message":"should be >= 1"}]');
        });
    });
    describe('Property Access Validation', function () {
        it('validate prop access', function () {
            chai_1.assert.throw(() => {
                let user = new data_1.ExampleUser({
                    id: 2,
                    data: { currency: "ILS", name: "Boris", surname: "Kolesnikov" }
                }, data_1.ExampleUserData);
                user.id = "ANY";
            });
        });
        it('validate embedded prop access', function () {
            chai_1.assert.throw(() => {
                let user = new data_1.ExampleUser({
                    id: 2,
                    data: { currency: "ILS", name: "Boris", surname: "Kolesnikov" }
                }, data_1.ExampleUserData);
                user.data.currency = "ANY";
            });
            chai_1.assert.throw(() => {
                let user = new data_1.ExampleUser({
                    id: 2,
                    data: { currency: "ILS", name: "Boris", surname: "Kolesnikov" }
                }, data_1.ExampleUserData);
                console.log(user);
                //@ts-ignore
                user.data = { currency: "ANY" };
            }, 'FUCK');
        });
    });
});
//# sourceMappingURL=example-users.js.map