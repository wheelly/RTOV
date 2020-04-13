
const debugOn = process.env.DEBUG && process.env.DEBUG == '1'

export const debug = debugOn ? (data: { () : void } | any) => {
  if (typeof data === 'function') {
    console.log(data());
  } else {
    console.log(data);
  }
} : () => undefined