"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("./lib");
const AJV = require("ajv");
class IndexType {
}
class RtOVArray extends IndexType {
    constructor(items, metaData, ajv = new AJV({ allErrors: true })) {
        super();
        this.metaData = metaData;
        this.ajv = ajv;
        const itemMeta = this.itemsMetaData();
        for (let i = 0; i < items.length; i++) {
            this.addProperty(i.toString(), items[i]);
            lib_1.setValidator(this.ajv, [], itemMeta, this, items[i], i.toString());
        }
        this.addProperty('length', items.length);
    }
    toJSON() {
        return Array.from(this);
    }
    itemsMetaData() {
        const items = this.metaData.schema.items;
        if (!items || !Object.keys(items).length) {
            throw Error("No items for array validation");
        }
        //this is ajv type checking for each property of the array - should satisfy any of because it one item
        const propertyPossibleTypes = (() => {
            //TODO: if all of we must re-invoke somehow validation of the whole array from the main object again
            for (const unionType of ["allOf", "anyOf", "oneOf"]) {
                const unionTypeValue = items[unionType];
                if (unionTypeValue) {
                    if (!Array.isArray(unionTypeValue)) {
                        throw new Error(`Array expected. Got ${unionTypeValue}`);
                    }
                    return unionTypeValue;
                }
            }
            return items;
        })();
        return { className: this.metaData.className + ':' + this.constructor.name, schema: { anyOf: propertyPossibleTypes } };
    }
    addProperty(name, value) {
        Object.defineProperty(this, name, {
            value,
            writable: false,
            configurable: true //let it be redefined
        });
    }
}
exports.RtOVArray = RtOVArray;
//# sourceMappingURL=rtov-array.js.map