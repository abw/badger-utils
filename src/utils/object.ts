import { selector, SelectSpec } from './select'
import { splitHash, HashSource } from './text'

type HashKeyFunction = (
  key: string,
  value: any,
  source: HashSource,
  hash: object
) => string

type HashValueFunction = (
  value: any,
  key: string,
  source: HashSource,
  hash: object
) => string

type ObjMapFunction = (
  value: any,
  key: string
) => any

// type ExtractFunction = (key: string) => any
// type ExtractKeys = object | string[] | string | RegExp | ExtractFunction
type KeyFunction = (key: string) => string
type ValueFunction = (value: any) => any

export function hash(
  source: string|object|any[],
  options: {
    include?: any,
    exclude?: any,
    key?: HashKeyFunction,
    value?: HashValueFunction,
  } = { }
): object {
  const include = options.include && selector(options.include)
  const exclude = options.exclude && selector(options.exclude)
  return entries(splitHash(source)).reduce(
    (hash: object, [key, value]) => {
      if (include && ! include(key, value, source, hash)) {
        return hash
      }
      if (exclude && exclude(key, value, source, hash)) {
        return hash
      }
      if (options.key) {
        key = options.key(key, value, source, hash)
      }
      if (options.value) {
        value = options.value(value, key, source, hash)
      }
      return {
        ...hash,
        [key]: value
      }
    },
    { }
  )
}

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
export function objMap(obj: object, fn: ObjMapFunction): object {
  return Object.keys(obj).reduce(
    (result: object, key: string) => ({
      ...result,
      [key]: fn(obj[key as keyof object], key)
    }),
    { }
  )
}

/**
 * Extracts a subset of items from an object.
 * @param {Object} object - source object
 * @param {Object|Array|string|RegExp|Function} keys - keys to extract
 * @param {Object} [options] -
 * @param {boolean} [options.delete=false] - delete keys from source object
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
export const extract = (
  object: object,
  keys: SelectSpec,
  options: {
    key?: KeyFunction,
    value?: ValueFunction,
    delete?: boolean
  } = { }
): object => {
  let extract = { }
  let actions = { delete: false, ...options }
  const matcher = selector(keys)

  Object.keys(object).map(
    key => {
      if (matcher(key)) {
        let value: any = object[key as keyof object]
        if (actions.delete) {
          delete object[key as keyof object]
        }
        if (actions.key) {
          key = actions.key(key)
        }
        if (actions.value) {
          value = actions.value(value)
        }
        extract = {
          ...extract,
          [key]: value
        }
        // extract[key as keyof object] = value
      }
    }
  )
  return extract
}
export const objSubset = extract

/**
 * Removes an item from an object and returns the value.
 * @param {Object} object - source object
 * @param {string} key - item to remove
 * @return {any} - value of removed item
 * @example
 * remove(
 *   { a: 'alpha', b: 'bravo', c: 'charlie' },
 *   'a'
 * ) // => { a: 'alpha', b: 'bravo' }
 */
export const remove = (object: { }, key: string): any => {
  const value = object[key as keyof object]
  delete object[key as keyof object]
  return value
}

/**
 * Alias for `Object.keys`.
 * @param {Object} object - source object
 * @return {Array} - array of keys
 * @example
 * keys(
 *   { a: 'alpha', b: 'bravo', c: 'charlie' },
 * ) // => ['a', 'b', 'c']
 */
export const keys = Object.keys

/**
 * Alias for `Object.values`.
 * @param {Object} object - source object
 * @return {Array} - array of values
 * @example
 * values(
 *   { a: 'alpha', b: 'bravo', c: 'charlie' },
 * ) // => ['alpha', 'bravo', 'charlie']
 */
export const values = Object.values

/**
 * Alias for `Object.entries`.
 * @param {Object} object - source object
 * @return {Array} - array of `[key, value]` arrays
 * @example
 * entries(
 *   { a: 'alpha', b: 'bravo', c: 'charlie' },
 * ) // => [ ['a', 'alpha'], ['b', 'bravo'], ['c', 'charlie'] ]
 */
export const entries = Object.entries

