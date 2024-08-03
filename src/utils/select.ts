import { isArray, isFunction, isObject, isRegExp, isString } from './assert'
import { fail } from './error'
import { splitHash } from './text'

export type SelectFunction = (key: string, value?: any, source?: any, hash?: any) => boolean
export type SelectSpec = object | string[] | string | RegExp | SelectFunction

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

