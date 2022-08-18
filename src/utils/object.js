import { splitList } from './text.js';

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
 * @param {Array|String} keys - Array or string of keys to extract
 * @return {Object} - new object with function applied to values
 * @example
 * objSubset(
 *   { a: 'alpha', b: 'bravo', c: 'charlie' },
 *   'a b'
 * ) // => { a: 'alpha', b: 'bravo' }
 */
export function objSubset(obj, keys) {
  return splitList(keys).reduce(
    (result, key) => {
      result[key] = obj[key];
      return result
    },
    {}
  );
}
