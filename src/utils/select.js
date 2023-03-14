import { isArray, isFunction, isObject, isRegExp, isString } from './assert.js';
import { fail } from './error.js';
import { splitHash } from './text.js';

export function selector(spec) {
  if (isFunction(spec)) {
    return spec;
  }
  else if (isRegExp(spec)) {
    return item => spec.test(item);
  }
  else if (isObject(spec)) {
    return item => Boolean(spec[item]);
  }
  else if (isArray(spec) || isString(spec)) {
    const hash = splitHash(spec);
    return item => Boolean(hash[item]);
  }
  else {
    fail("Invalid selector() specification: " + spec);
  }
}

