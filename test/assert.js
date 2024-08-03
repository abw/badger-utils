import test from './library/ava-vitest.js'
import {
  isBoolean, isString, isInteger, isFloat, isNumber, isObject, isArray,
  isUndefined, isNull, hasValue, haveValue, noValue, firstValue, isRegExp, isEmpty,
  isSimple,
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
  t => t.false(isString())
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
  t => t.false(isNumber())
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
  t => t.false(isInteger())
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
  t => t.false(isFloat())
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

// isRegExp()
test(
  'isRegExp() identifies Regexps',
  t => t.true(isRegExp(/foo/))
)
test(
  'isRegExp() identifies non-RegExp',
  t => t.false(isRegExp(123))
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
  t => t.true(isUndefined())
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
  t => t.false(isNull())
)

// hasValue()
test(
  'hasValue identifies nothing = false',
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

// noValue()
test(
  'noValue identifies nothing = true',
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
