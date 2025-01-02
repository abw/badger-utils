import test from './library/ava-vitest'
import {
  isBoolean, isString, isInteger, isFloat, isNumber, isObject, isArray,
  isUndefined, isNull, hasValue, hasValues, haveValue, noValue, firstValue, isRegExp, isEmpty,
  isSimple, isFunction,
} from '../src/index'

// isBoolean()
test(
  'isBoolean() identifies true',
  t => t.true(isBoolean(true))
)
test(
  'isBoolean() identifies false',
  t => t.true(isBoolean(false))
)
test(
  'isBoolean() identifies number',
  t => t.false(isBoolean(1))
)
test(
  'isBoolean() asserts boolean type',
  t => {
    function even(a: boolean | number): boolean {
      if (isBoolean(a)) {
        return a
      }
      else {
        return a % 2 === 0
      }
    }
    t.is( even(true), true )
    t.is( even(4), true )
    t.is( even(3), false )
  }
)


// isString()
test(
  'isString() identifies string',
  t => t.true(isString('foo'))
)
test(
  'isString() identifies number',
  t => t.false(isString(123))
)
test(
  'isString() identifies undefined',
  // @ts-ignore
  t => t.false(isString())
)
test(
  'isString() asserts string type',
  t => {
    function foo(a: string | number) {
      if (isString(a)) {
        return a.length
      }
      else {
        return a
      }
    }
    t.is( foo('hello'), 5 )
    t.is( foo(4), 4 )
  }
)

// isNumber()
test(
  'isNumber() identifies integer',
  t => t.true(isNumber(42))
)
test(
  'isNumber() identifies float',
  t => t.true(isNumber(42.43))
)
test(
  'isNumber() identifies string',
  t => t.false(isNumber('42'))
)
test(
  'isNumber() identifies undefined',
  // @ts-ignore
  t => t.false(isNumber())
)
test(
  'isNumber() asserts number type',
  t => {
    function addOne(a: string | number) {
      if (isNumber(a)) {
        return a + 1
      }
      else {
        return parseFloat(a) + 1
      }
    }
    t.is( addOne(5), 6 )
    t.is( addOne("6"), 7 )
  }
)

// isInteger()
test(
  'isInteger() identifies integer',
  t => t.true(isInteger(42))
)
test(
  'isInteger() identifies float',
  t => t.false(isInteger(42.43))
)
test(
  'isInteger() identifies float with zero decimal part',
  t => t.true(isInteger(42.0))
)
test(
  'isInteger() identifies string',
  t => t.false(isInteger('42'))
)
test(
  'isInteger() identifies undefined',
  // @ts-ignore
  t => t.false(isInteger())
)
test(
  'isInteger() asserts number type',
  t => {
    function addOne(a: string | number) {
      if (isInteger(a)) {
        return a + 1
      }
      else {
        return parseInt(a) + 1
      }
    }
    t.is( addOne(5), 6 )
    t.is( addOne("6"), 7 )
  }
)

// isFloat()
test(
  'isFloat() identifies integer',
  t => t.false(isFloat(42))
)
test(
  'isFloat() identifies float',
  t => t.true(isFloat(42.43))
)
test(
  'isFloat() identifies float with zero decimal part',
  t => t.false(isFloat(42.0))
)
test(
  'isFloat() identifies string',
  t => t.false(isFloat('42'))
)
test(
  'isFloat() identifies undefined',
  // @ts-ignore
  t => t.false(isFloat())
)
test(
  'isFloat() asserts number type',
  t => {
    function addOne(a: string | number) {
      if (isFloat(a)) {
        return a + 1
      }
      else {
        return parseInt(a) + 1
      }
    }
    t.is( addOne(5), 6 )
    t.is( addOne("6"), 7 )
  }
)

// isArray()
test(
  'isArray() identifies arrays',
  t => t.true(isArray([1,2,3]))
)
test(
  'isArray() identifies non-arrays',
  t => t.false(isArray(123))
)
test(
  'isArray() identifies null',
  t => t.false(isArray(null))
)
test(
  'isArray() asserts array type',
  t => {
    function howLong(a: number | number[]) {
      if (isArray(a)) {
        return a.length
      }
      else {
        return a
      }
    }
    t.is( howLong(5), 5 )
    t.is( howLong([1,2,3]), 3 )
  }
)

// isObject()
test(
  'isObject() identifies class instance',
  t => t.true(isObject(new Date()))
)
test(
  'isObject() identifies "hash table"',
  t => t.true(isObject({ b: 'badger' }))
)
test(
  'isObject() identifies array',
  t => t.false(isObject([10, 20]))
)
test(
  'isObject() identifies null',
  t => t.false(isObject(null))
)
test(
  'isObject() asserts object type',
  t => {
    function whatNumber(a: { n: number } | number) {
      if (isObject(a)) {
        return a.n
      }
      else {
        return a
      }
    }
    t.is( whatNumber(1), 1 )
    t.is( whatNumber({ n: 2 }), 2 )
  }
)

test(
  'isFunction() identifies function',
  t => {
    function f(a: number) {
      return a + 1
    }
    t.true(isFunction(f))
  }
)
test(
  'isFunction() identifies arrow function',
  t => {
    const f = (a: number) => a + 1
    t.true(isFunction(f))
  }
)
test(
  'isFunction() identifies non-function',
  t => t.false(isFunction(1))
)
test(
  'isFunction() asserts function type',
  t => {
    function maybeCallThis(a: number | (() => number)) {
      if (isFunction(a)) {
        return a()
      }
      else {
        return a
      }
    }
    t.is( maybeCallThis(1), 1 )
    t.is( maybeCallThis(() => 2), 2 )
  }
)

// isRegExp()
test(
  'isRegExp() identifies Regexps',
  t => t.true(isRegExp(/foo/))
)
test(
  'isRegExp() identifies non-RegExp',
  t => t.false(isRegExp(123))
)
test(
  'isRegExp() asserts RegExp type',
  t => {
    function maybeMatch(a: RegExp | string) {
      if (isRegExp(a)) {
        return a.test('hello')
      }
      else {
        return Boolean('hello'.match(a))
      }
    }
    t.is( maybeMatch(/hell/), true )
    t.is( maybeMatch(/hill/), false )
    t.is( maybeMatch('hell'), true )
    t.is( maybeMatch('hill'), false )
  }
)


// isUndefined()
test(
  'isUndefined identifies undefined',
  t => t.true(isUndefined(undefined))
)
test(
  'isUndefined identifies null',
  t => t.false(isUndefined(null))
)
test(
  'isUndefined identifies nothing',
  // @ts-ignore
  t => t.true(isUndefined())
)
test(
  'isUndefined() asserts undefined type',
  t => {
    function maybe(a: number | undefined): number {
      return isUndefined(a)
        ? 42
        : a
    }
    t.is( maybe(5), 5 )
    t.is( maybe(undefined), 42 )
  }
)

// isNull()
test(
  'isNull identifies undefined',
  t => t.false(isNull(undefined))
)
test(
  'isNull identifies null',
  t => t.true(isNull(null))
)
test(
  'isNull identifies nothing',
  // @ts-ignore
  t => t.false(isNull())
)
test(
  'isNull() asserts null type',
  t => {
    function maybe(a: number | null): number {
      return isNull(a)
        ? 42
        : a
    }
    t.is( maybe(5), 5 )
    t.is( maybe(null), 42 )
  }
)

// hasValue()
test(
  'hasValue identifies nothing = false',
  // @ts-ignore
  t => t.false(hasValue())
)
test(
  'hasValue identifies undefined = false',
  t => t.false(hasValue(undefined))
)
test(
  'hasValue identifies null = false',
  t => t.false(hasValue(null))
)
test(
  'hasValue identifies false = true',
  t => t.true(hasValue(false))
)
test(
  'hasValue identifies 0 = true',
  t => t.true(hasValue(0))
)
test(
  'hasValue() asserts non-null or non-undefined type',
  t => {
    function maybe(a: number | null | undefined): number {
      return hasValue(a)
        ? a
        : 42
    }
    t.is( maybe(5), 5 )
    t.is( maybe(null), 42 )
    t.is( maybe(undefined), 42 )
  }
)


// haveValue()
test(
  'haveValue(false, null) = false',
  t => t.false(haveValue(false, null))
)
test(
  'haveValue(true, null) = false',
  t => t.false(haveValue(true, null))
)
test(
  'haveValue(true, true) = true',
  t => t.true(haveValue(true, true))
)
test(
  'haveValue(1, 2) = true',
  t => t.true(haveValue(1, 2))
)
test(
  'haveValue() asserts array with non-null or non-undefined items',
  t => {
    function addTwoNumbers(a: number | null, b: number | null): number {
      // Tyepscript can't type check rest params :-(
      // Note that the additional "as number" assertions  required to keep
      // Typescript happy
      return haveValue(a, b)
        ? (a as number) + (b as number)
        : 42
    }
    t.is( addTwoNumbers(5, 6), 11 )
    t.is( addTwoNumbers(5, null), 42 )
  }
)

// hasValues()
test(
  'hasValues([false, null]) = false',
  t => t.false(hasValues([false, null]))
)
test(
  'hasValues([true, null]) = false',
  t => t.false(hasValues([true, null]))
)
test(
  'hasValues([true, true]) = true',
  t => t.true(hasValues([true, true]))
)
test(
  'hasValues([1, 2]) = true',
  t => t.true(hasValues([1, 2]))
)

test(
  'hasValues() asserts array with non-null or non-undefined items',
  t => {
    function addSomeNumbers(a: Array<number | null | undefined>): number {
      return hasValues(a)
        ? a.reduce( (sum, n) => sum + n, 0 )
        : 42
    }
    t.is( addSomeNumbers([5, 6]), 11 )
    t.is( addSomeNumbers([5, 6, null]), 42 )
    t.is( addSomeNumbers([5, 6, undefined]), 42 )
  }
)

// noValue()
test(
  'noValue identifies nothing = true',
  // @ts-ignore
  t => t.true(noValue())
)
test(
  'noValue identifies undefined = true',
  t => t.true(noValue(undefined))
)
test(
  'noValue identifies null = true',
  t => t.true(noValue(null))
)
test(
  'noValue identifies false = false',
  t => t.false(noValue(false))
)
test(
  'noValue identifies 0 = true',
  t => t.false(noValue(0))
)
test(
  'noValue() asserts non-value type',
  t => {
    function maybe(a: number | null | undefined): number {
      return noValue(a)
        ? 42
        : a
    }
    t.is( maybe(5), 5 )
    t.is( maybe(null), 42 )
    t.is( maybe(undefined), 42 )
  }
)


// firstValue()
test(
  'firstValue returns 0',
  t => t.is(firstValue(0, 1, 2), 0)
)
test(
  'firstValue returns 0 after undefined',
  t => t.is(firstValue(undefined, 0, 1, 2), 0)
)
test(
  'firstValue returns 1',
  t => t.is(firstValue(1, 2, 3), 1)
)
test(
  'firstValue returns 1 after null',
  t => t.is(firstValue(null, 1, 2, 3), 1)
)
test(
  'firstValue returns false',
  t => t.false(firstValue(false, 1, 2, 3))
)
test(
  'firstValue returns empty string',
  t => t.is(firstValue('', 1, 2, 3), '')
)
test(
  'firstValue() asserts valued type',
  t => {
    function maybe(...a: any[]): number {
      return firstValue(...a) || 42
    }
    t.is( maybe(5), 5 )
    t.is( maybe(null, 6), 6 )
    t.is( maybe(null, null), 42 )
  }
)


// isEmpty()
test(
  'isEmpty on empty object',
  t => t.true(isEmpty({ }))
)
test(
  'isEmpty on empty array',
  t => t.true(isEmpty([ ]))
)
test(
  'isEmpty on non-empty object',
  t => t.false(isEmpty({ a: 10 }))
)
test(
  'isEmpty on non-empty array',
  t => t.false(isEmpty([ 10 ]))
)

// isSimple()
test(
  'isSimple string',
  t => t.true(isSimple('hello'))
)
test(
  'isSimple integer',
  t => t.true(isSimple(11))
)
test(
  'isSimple float',
  t => t.true(isSimple(23.45))
)
test(
  'isSimple true',
  t => t.true(isSimple(true))
)
test(
  'isSimple false',
  t => t.true(isSimple(false))
)
test(
  'isSimple object',
  t => t.false(isSimple({ }))
)
test(
  'isSimple array',
  t => t.false(isSimple([ ]))
)
test(
  'isSimple function',
  t => t.false(isSimple(() => 23))
)
test(
  'isSimple null',
  t => t.false(isSimple(null))
)
