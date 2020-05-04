"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
const chai_1 = require("chai");
const RTOV_1 = require("../RTOV");
describe('EmbeddedObject Invalid Data', function () {
    describe('Property Instancing Validation', function () {
        it('validate prop creation - incorrect currency', function () {
            chai_1.assert.throw(() => {
                new data_1.EmbeddedObject({
                    id: 2,
                    data: { currency: "ANY", name: "Boris", surname: "Kolesnikov" }
                }, data_1.ObjectData);
            }, '[{"keyword":"enum","dataPath":"","schemaPath":"#/enum","params":{"allowedValues":["ILS","EUR","USD"]},"message":"should be equal to one of the allowed values"}]');
        });
        it('validate embedded prop access', function () {
            chai_1.assert.throw(() => {
                new data_1.EmbeddedObject({
                    id: 0,
                    data: { currency: "ILS", name: "Boris", surname: "Kolesnikov" }
                }, data_1.ObjectData);
            }, '[id]=[{"keyword":"minimum","dataPath":"","schemaPath":"#/minimum","params":{"comparison":">=","limit":1,"exclusive":false},"message":"should be >= 1"}]');
        });
    });
    describe('Property Access Validation', function () {
        it('validate prop access', function () {
            chai_1.assert.throw(() => {
                let user = new data_1.EmbeddedObject({
                    id: 2,
                    data: { currency: "ILS", name: "Boris", surname: "Kolesnikov" }
                }, data_1.ObjectData);
                console.log(JSON.stringify(user));
                console.log(JSON.stringify(RTOV_1.getSchema(user)));
                user.id = "ANY";
            });
        });
        it('validate embedded prop access', function () {
            chai_1.assert.throw(() => {
                let user = new data_1.EmbeddedObject({
                    id: 2,
                    data: { currency: "ILS", name: "Boris", surname: "Kolesnikov" }
                }, data_1.ObjectData);
                user.data.currency = "ANY";
            });
            chai_1.assert.throw(() => {
                let user = new data_1.EmbeddedObject({
                    id: 2,
                    data: { currency: "ILS", name: "Boris", surname: "Kolesnikov" }
                }, data_1.ObjectData);
                //@ts-ignore
                user.data = { currency: "ANY" };
            }, '[{"keyword":"enum","dataPath":".currency","schemaPath":"#/properties/currency/enum","params":{"allowedValues":["ILS","EUR","USD"]},"message":"should be equal to one of the allowed values"},{"keyword":"required","dataPath":"","schemaPath":"#/required","params":{"missingProperty":"name"},"message":"should have required property \'name\'"},{"keyword":"required","dataPath":"","schemaPath":"#/required","params":{"missingProperty":"surname"},"message":"should have required property \'surname\'"}]');
        });
    });
});
//# sourceMappingURL=embedded-object-invalid-data.js.map