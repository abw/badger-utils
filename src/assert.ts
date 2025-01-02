/**
 * Determines if a value is a boolean
 * @param {boolean} value - value to test
 * @return {boolean} true if `value` is a string or false if not
 */
export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean'
}

/**
 * Determines if a value is a string
 * @param {string} value - value to test
 * @return {boolean} true if `value` is a string or false if not
 */
export function isString(value: any): value is string {
  return typeof value === 'string'
}

/**
 * Determines if a value is a number
 * @param {number} value - value to test
 * @return {boolean} true if `value` is a number or false if not
 */
export function isNumber(value: any): value is number {
  return typeof value === 'number'
}

/**
 * Determines if a value is an Integer
 * @param {number} value - value to test
 * @return {boolean} true if `value` is an integer or false if not
 */
export function isInteger(value: any): value is number {
  return Number.isInteger(value)
}

/**
 * Determines if a value is a floating point number
 * @param {number} value - value to test
 * @return {boolean} true if `value` is an integer or false if not
 */
export function isFloat(value: any): value is number {
  return isNumber(value) && ! isInteger(value)
}

/**
 * Determines if a value is an array
 * @param {Array} value - value to test
 * @return {boolean} true if `value` is an Array or false if not
 */
export function isArray(value: any): value is any[] {
  return Array.isArray(value)
}

/**
 * Determines if a value is a Function
 * @param {Function} value - value to test
 * @return {boolean} true if `value` is a Function or false if not
 */
export function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === 'function'
}

/**
 * Determines if a value is an RegExp object
 * @param {Object} value - value to test
 * @return {boolean} true if `value` is a RegExp Object or not
 */

export function isRegExp(value: any): value is RegExp {
  return value instanceof RegExp
}

/**
 * Determines if a value is an Object (but not an Array)
 * @param {Object} value - value to test
 * @return {boolean} true if `value` is an Object or false if not
 */
export function isObject(value: any): value is object {
  return typeof value === 'object'
    && ! isArray(value)
    && ! isNull(value)
}

/**
 * Determines if a value is a "simple" scalar value, e.g. a string, number or boolean.
 * @param {any} value - value to test
 * @return {boolean} true if `value` is a string, number or boolean
 */

export function isSimple(value: any): boolean {
  return isString(value) || isNumber(value) || isBoolean(value)
}

/**
 * Determines if a value is `undefined`
 * @param {any} value - value to test
 * @return {boolean} true if `value` is `undefined` or false if not
 */
export function isUndefined(value: any): value is undefined {
  return typeof value === 'undefined'
}

/**
 * Determines if a value is `null`
 * @param {any} value - value to test
 * @return {boolean} true if `value` is `null` or false if not
 */
export function isNull(value: any): value is null {
  return value === null
}

/**
 * Determines if a value is defined and not null
 * @param {any} value - value to test
 * @return {boolean} true if `value` is not `undefined` or `null`
 */
export function hasValue<T>(value: T | undefined | null): value is T {
  return ! (isUndefined(value) || isNull(value))
}

/**
 * Determines if all values are defined and not null
 * @param values - values to test
 * @return {boolean} true if all values are not `undefined` or `null`
 */
export function haveValue(...values: any[]): boolean {
  return hasValues(values)
}

/**
 * Determines if all values in an array are defined and not null
 * @param values - array of values to test
 * @return {boolean} true if all values in array are not `undefined` or `null`
 */

export function hasValues<T extends unknown[]>(values: T):
  values is { [P in keyof T]: Exclude<T[P], undefined | null> } {
  return values.every( value => hasValue(value) )
}

/**
 * Determines if a value is undefined or null
 * @param {any} value - value to test
 * @return {boolean} true if `value` is `undefined` or `null`
 */
export function noValue(value:any): value is undefined | null {
  return ! hasValue(value)
}

/**
 * Returns the first argument that has a value
 * @param {any[]} values - values to test
 * @return {any} first argument that has a value that is not `undefined` or `null`
 */
export function firstValue(...values: any[]): any {
  return values.find( value => hasValue(value) )
}

/**
 * Determines if an object or array is empty.
 * @param {Object|Array} object - source object or array
 * @return {boolean} - true if object or array is empty
 * @example
 * isEmpty({ }) // true
 * @example
 * isEmpty([ ]) // true
 * @example
 * isEmpty({ a: 10 }) // false
 * @example
 * isEmpty([ 10 ]) // false
 */
export const isEmpty = (obj : object | any[]): boolean =>
  isArray(obj)
    ? obj.length === 0
    : Object.keys(obj).length === 0

