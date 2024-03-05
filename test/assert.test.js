import test from 'ava';
import {
  isBoolean, isString, isInteger, isFloat, isNumber,
  isObject, isArray, isUndefined, isNull, hasValue, noValue, firstValue, isRegExp, isEmpty,
} from '../src/index.js'

// isBoolean()
test(
  'isBoolean() identifies true',
  t => t.is(isBoolean(true), true)
);
test(
  'isBoolean() identifies false',
  t => t.is(isBoolean(false), true)
);
test(
  'isBoolean() identifies number',
  t => t.is(isBoolean(1), false)
);

// isString()
test(
  'isString() identifies string',
  t => t.is(isString("foo"), true)
);
test(
  'isString() identifies number',
  t => t.is(isString(123), false)
);
test(
  'isString() identifies undefined',
  t => t.is(isString(), false)
);

// isNumber()
test(
  'isNumber() identifies integer',
  t => t.is(isNumber(42), true)
);
test(
  'isNumber() identifies float',
  t => t.is(isNumber(42.43), true)
);
test(
  'isNumber() identifies string',
  t => t.is(isNumber('42'), false)
);
test(
  'isNumber() identifies undefined',
  t => t.is(isNumber(), false)
);

// isInteger()
test(
  'isInteger() identifies integer',
  t => t.is(isInteger(42), true)
);
test(
  'isInteger() identifies float',
  t => t.is(isInteger(42.43), false)
);
test(
  'isInteger() identifies float with zero decimal part',
  t => t.is(isInteger(42.0), true)
);
test(
  'isInteger() identifies string',
  t => t.is(isInteger('42'), false)
);
test(
  'isInteger() identifies undefined',
  t => t.is(isInteger(), false)
);


// isFloat()
test(
  'isFloat() identifies integer',
  t => t.is(isFloat(42), false)
);
test(
  'isFloat() identifies float',
  t => t.is(isFloat(42.43), true)
);
test(
  'isFloat() identifies float with zero decimal part',
  t => t.is(isFloat(42.0), false)
);
test(
  'isFloat() identifies string',
  t => t.is(isFloat('42'), false)
);
test(
  'isFloat() identifies undefined',
  t => t.is(isFloat(), false)
);

// isArray()
test(
  'isArray() identifies arrays',
  t => t.is(isArray([1,2,3]), true)
);
test(
  'isArray() identifies non-arrays',
  t => t.is(isArray(123), false)
);
test(
  'isArray() identifies null',
  t => t.is(isArray(null), false)
);

// isRegExp()
test(
  'isRegExp() identifies Regexps',
  t => t.is(isRegExp(/foo/), true)
);
test(
  'isRegExp() identifies non-RegExp',
  t => t.is(isRegExp(123), false)
);

// isObject()
test(
  'isObject() identifies class instance',
  t => t.is(isObject(new Date()), true)
);
test(
  'isObject() identifies "hash table"',
  t => t.is(isObject({ b: 'badger' }), true)
);
test(
  'isObject() identifies array',
  t => t.is(isObject([10, 20]), false)
);
test(
  'isObject() identifies null',
  t => t.is(isObject(null), false)
);

// isUndefined()
test(
  'isUndefined identifies undefined',
  t => t.is(isUndefined(undefined), true)
);
test(
  'isUndefined identifies null',
  t => t.is(isUndefined(null), false)
);
test(
  'isUndefined identifies nothing',
  t => t.is(isUndefined(), true)
);

// isNull()
test(
  'isNull identifies undefined',
  t => t.is(isNull(undefined), false)
);
test(
  'isNull identifies null',
  t => t.is(isNull(null), true)
);
test(
  'isNull identifies nothing',
  t => t.is(isNull(), false)
);

// hasValue()
test(
  'hasValue identifies nothing = false',
  t => t.is(hasValue(), false)
);
test(
  'hasValue identifies undefined = false',
  t => t.is(hasValue(undefined), false)
);
test(
  'hasValue identifies null = false',
  t => t.is(hasValue(null), false)
);
test(
  'hasValue identifies false = true',
  t => t.is(hasValue(false), true)
);
test(
  'hasValue identifies 0 = true',
  t => t.is(hasValue(0), true)
);

// noValue()
test(
  'noValue identifies nothing = true',
  t => t.is(noValue(), true)
);
test(
  'noValue identifies undefined = true',
  t => t.is(noValue(undefined), true)
);
test(
  'noValue identifies null = true',
  t => t.is(noValue(null), true)
);
test(
  'noValue identifies false = false',
  t => t.is(noValue(false), false)
);
test(
  'noValue identifies 0 = true',
  t => t.is(noValue(0), false)
);

// firstValue()
test(
  'firstValue returns 0',
  t => t.is(firstValue(0, 1, 2), 0)
);
test(
  'firstValue returns 0 after undefined',
  t => t.is(firstValue(undefined, 0, 1, 2), 0)
);
test(
  'firstValue returns 1',
  t => t.is(firstValue(1, 2, 3), 1)
);
test(
  'firstValue returns 1 after null',
  t => t.is(firstValue(null, 1, 2, 3), 1)
);
test(
  'firstValue returns false',
  t => t.is(firstValue(false, 1, 2, 3), false)
);
test(
  'firstValue returns empty string',
  t => t.is(firstValue("", 1, 2, 3), "")
);

// isEmpty()
test(
  'isEmpty on empty object',
  t => t.true(isEmpty({ }))
);
test(
  'isEmpty on empty array',
  t => t.true(isEmpty([ ]))
);
test(
  'isEmpty on non-empty object',
  t => t.false(isEmpty({ a: 10 }))
);
test(
  'isEmpty on non-empty array',
  t => t.false(isEmpty([ 10 ]))
);
