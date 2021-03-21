"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
const get_schema_1 = require("../get-schema");
describe('Array same objects', function () {
    it('Same object as embedded array items', function () {
        const user = new data_1.EmbeddedArraySameObjects();
        console.log(JSON.stringify(user));
        console.log(JSON.stringify(get_schema_1.getSchema(user)));
    });
});
//# sourceMappingURL=array-same-objects.js.map