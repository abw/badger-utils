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
 * @param {Object} object - source object
 * @param {Object|Array|String|RegExp|Function} keys - keys to extract
 * @param {Object} [options] -
 * @param {Boolean} [options.delete=false] - delete keys from source object
 * @param {Function} [options.key] - function to transform key
 * @param {Function} [options.value] - function to transform value
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
export const extract = (object, keys, options={}) => {
  let matcher;
  let extract = { };
  let actions = { delete: false, ...options };

  if (isFunction(keys)) {
    matcher = keys;
  }
  else if (keys instanceof RegExp) {
    matcher = key => keys.test(key);
  }
  else if (isObject(keys)) {
    matcher = key => keys[key];
  }
  else if (isArray(keys) || isString(keys)) {
    const keysHash = splitHash(keys);
    matcher = key => keysHash[key];
  }
  else {
    fail("Invalid specification for extract(): " + keys);
  }
  Object.keys(object).map(
    key => {
      if (matcher(key)) {
        let value = object[key];
        if (actions.delete) {
          delete object[key];
        }
        if (actions.key) {
          key = actions.key(key);
        }
        if (actions.value) {
          value = actions.value(value);
        }
        extract[key] = value;
      }
    }
  )
  return extract;
}

/**
 * Removes an item from an object and returns the value.
 * @param {Object} object - source object
 * @param {String} key - item to remove
 * @return {Any} - value of removed item
 * @example
 * remove(
 *   { a: 'alpha', b: 'bravo', c: 'charlie' },
 *   'a'
 * ) // => { a: 'alpha', b: 'bravo' }
 */
export const remove = (object, key) => {
  const value = object[key];
  delete object[key];
  return value;
}


