import {isComplexType} from "./index";

const PROP_PREFIX = "__";

export const getPublicProperties = (obj: any) => Object.getOwnPropertyNames(obj).filter((prop) => !prop.startsWith(PROP_PREFIX));

export const getPropName = (name: string) => PROP_PREFIX + name;

export const setReadOnlyProperty = (obj: any, prop: string, data: any) => {
  Object.defineProperty(obj, getPropName(prop), {
    value: data || obj[prop], //default value
    writable: false,
    configurable: true //let it be redefined
  });
}

export const setPropertyRecursive = (obj: any, prop: string, data: any) => {
  if (isComplexType(obj[prop]) && ! Array.isArray(obj[prop])) {
    for (const subProp of getPublicProperties(obj[prop])) {
      setPropertyRecursive(obj[prop], subProp, data[subProp]);
    }
    setReadOnlyProperty(obj, prop, obj[prop]);
  } else {
    setReadOnlyProperty(obj, prop, data);
  }
}


