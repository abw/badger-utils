import { isArray, isFunction, isObject, isString } from './assert.js';
import { fail } from './error.js';
import { splitHash } from './text.js';

/**
 * Applies a function to each of the values of an object and returns
 * a new object.
 * @param {Object} obj - source object
 * @param {Function} fn - function to apply to each value
 * @return {Object} - new object with function applied to values
 * @example
 * objMap(
 *   { a: 'alpha', b: 'bravo' },
 *   v => v.toUpperCase()
 * )                        // returns { a: 'ALPHA', b: 'BRAVO' }
 */
export function objMap(obj, fn) {
  return Object.keys(obj).reduce(
    (result, key) => {
      result[key] = fn(obj[key], key)
      return result
    },
    {}
  );
}

/**
 * Extracts a subset of items from an object.
 * @param {Object} obj - source object
 * @param {Object|Array|String|RegExp|Function} keys - keys to extract
 * @param {Boolean} [del=true] - delete keys from source object
 * @return {Object} - new object with extracted values
 * @example
 * extract(
 *   { a: 'alpha', b: 'bravo', c: 'charlie' },
 *   { a: true, b: true }
 * ) // => { a: 'alpha', b: 'bravo' }
 * @example
 * extract(
 *   { a: 'alpha', b: 'bravo', c: 'charlie' },
 *   ['a', 'b']
 * ) // => { a: 'alpha', b: 'bravo' }
 * @example
 * extract(
 *   { a: 'alpha', b: 'bravo', c: 'charlie' },
 *   'a b'
 * ) // => { a: 'alpha', b: 'bravo' }
 * @example
 * extract(
 *   { a: 'alpha', b: 'bravo', c: 'charlie' },
 *   /^[a|b]$/
 * ) // => { a: 'alpha', b: 'bravo' }
 * @example
 * extract(
 *   { a: 'alpha', b: 'bravo', c: 'charlie' },
 *   key => key === 'a' || key === 'b'
 * ) // => { a: 'alpha', b: 'bravo' }
 */

export const extract = (object, spec, del=true) => {
  let matcher;
  let extracted = { };

  if (isFunction(spec)) {
    matcher = spec;
  }
  else if (spec instanceof RegExp) {
    matcher = key => spec.test(key);
  }
  else if (isObject(spec)) {
    matcher = key => spec[key];
  }
  else if (isArray(spec) || isString(spec)) {
    const specHash = splitHash(spec);
    matcher = key => specHash[key];
  }
  else {
    fail("Invalid specification for extract(): " + spec);
  }
  Object.keys(object).map(
    key => {
      if (matcher(key)) {
        extracted[key] = object[key];
        if (del) {
          delete object[key];
        }
      }
    }
  )
  return extracted;
}

/**
 * Removes an item from an object and returns the value.
 * @param {Object} obj - source object
 * @param {String} key - item to remove
 * @return {Any} - value of removed item
 * @example
 * remove(
 *   { a: 'alpha', b: 'bravo', c: 'charlie' },
 *   'a'
 * ) // => { a: 'alpha', b: 'bravo' }
 */
export const remove = (object, item) => {
  const value = object[item];
  delete object[item];
  return value;
}


