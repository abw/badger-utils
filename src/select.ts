import { isArray, isFunction, isObject, isRegExp, isString } from './assert'
import { fail } from './error'
import { splitHash } from './text'

export type SelectFunction = (
  key: string,
  value?: unknown,
  source?: unknown,
  hash?: unknown
) => boolean

export type SelectSpec = object | string[] | string | RegExp | SelectFunction

/**
 * Generate a function to select items.
 * @param {Function|RegExp|Object|Array|string} spec - selection specification
 * @return {Function} - function to select an item
 * @example
 * selector(
 *   'foo bar'
 * )
 * @example
 * selector(
 *   ['foo', 'bar']
 * )
 * @example
 * selector(
 *   /^(foo|bar)$/
 * )
 * @example
 * selector({
 *   foo: true,
 *   bar: true
 * )
 */

export function selector(spec: SelectSpec): SelectFunction {
  if (isFunction(spec)) {
    return spec as SelectFunction
  }
  else if (isRegExp(spec)) {
    return item => (spec as RegExp).test(item)
  }
  else if (isObject(spec)) {
    return item => Boolean(spec[item as keyof object])
  }
  else if (isArray(spec) || isString(spec)) {
    const hash = splitHash(spec)
    return item => Boolean(hash[item as keyof object])
  }
  else {
    fail('Invalid selector() specification: ' + spec)
  }
}

