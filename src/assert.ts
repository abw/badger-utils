import { UnknownFunction, Nothing } from './types'

/**
 * Determines if a value is a boolean
 * @param value - value to test
 * @return true if `value` is a string or false if not
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

/**
 * Determines if a value is a string
 * @param value - value to test
 * @return true if `value` is a string or false if not
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/**
 * Determines if a value is a number
 * @param value - value to test
 * @return true if `value` is a number or false if not
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

/**
 * Determines if a value is an Integer
 * @param value - value to test
 * @return true if `value` is an integer or false if not
 */
export function isInteger(value: unknown): value is number {
  return Number.isInteger(value)
}

/**
 * Determines if a value is a floating point number
 * @param value - value to test
 * @return true if `value` is an integer or false if not
 */
export function isFloat(value: unknown): value is number {
  return isNumber(value) && ! isInteger(value)
}

/**
 * Determines if a value is an array
 * @param value - value to test
 * @return true if `value` is an Array or false if not
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}

/**
 * Determines if a value is a Function
 * @param value - value to test
 * @return true if `value` is a Function or false if not
 */
export function isFunction<T=UnknownFunction>(value: unknown): value is T {
  return typeof value === 'function'
}

/**
 * Determines if a value is an RegExp object
 * @param value - value to test
 * @return true if `value` is a RegExp Object or not
 */

export function isRegExp(value: unknown): value is RegExp {
  return value instanceof RegExp
}

/**
 * Determines if a value is an Object (but not an Array)
 * @param value - value to test
 * @return true if `value` is an Object or false if not
 */
export function isObject(value: unknown): value is object {
  return typeof value === 'object'
    && ! isArray(value)
    && ! isNull(value)
}

/**
 * Determines if a value is a "simple" scalar value, e.g. a string, number or boolean.
 * @param value - value to test
 * @return true if `value` is a string, number or boolean
 */

export function isSimple(value: unknown): value is string | number | boolean {
  return isString(value) || isNumber(value) || isBoolean(value)
}

/**
 * Determines if a value is `undefined`
 * @param value - value to test
 * @return true if `value` is `undefined` or false if not
 */
export function isUndefined(value: unknown): value is undefined {
  return typeof value === 'undefined'
}

/**
 * Determines if a value is `null`
 * @param value - value to test
 * @return true if `value` is `null` or false if not
 */
export function isNull(value: unknown): value is null {
  return value === null
}

/**
 * Determines if a value is defined and not null
 * @param value - value to test
 * @return true if `value` is not `undefined` or `null`
 */
export function hasValue<T>(value: T | Nothing): value is T {
  return ! (isUndefined(value) || isNull(value))
}

/**
 * Determines if all values are defined and not null
 * @param values - values to test
 * @return true if all values are not `undefined` or `null`
 */
export function haveValue(...values: unknown[]): boolean {
  return hasValues(values)
}

/**
 * Determines if all values in an array are defined and not null
 * @param values - array of values to test
 * @return true if all values in array are not `undefined` or `null`
 */

export function hasValues<T extends unknown[]>(values: T):
  values is { [P in keyof T]: Exclude<T[P], undefined | null> } {
  return values.every( value => hasValue(value) )
}

/**
 * Determines if a value is undefined or null
 * @param value - value to test
 * @return true if `value` is `undefined` or `null`
 */
export function noValue(value: unknown): value is undefined | null {
  return ! hasValue(value)
}

/**
 * Returns the first argument that has a value
 * @param values - values to test
 * @return first argument that has a value that is not `undefined` or `null`
 */
export function firstValue<T>(...values: Array<T|Nothing>): T | undefined {
  return values.find( value => hasValue<T>(value) ) ?? undefined
}

/**
 * Determines if an object or array is empty.
 * @param object - source object or array
 * @return true if object or array is empty
 * @example
 * isEmpty({ }) // true
 * @example
 * isEmpty([ ]) // true
 * @example
 * isEmpty({ a: 10 }) // false
 * @example
 * isEmpty([ 10 ]) // false
 */
export const isEmpty = (obj : object | unknown[]): boolean =>
  isArray(obj)
    ? obj.length === 0
    : Object.keys(obj).length === 0

