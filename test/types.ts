import { splitHash, splitList, StringIndexedObject } from '../src'
import test from './library/ava-vitest'

// These tests are trivial and don't really test anything.  It's a playground
// for me to check that typescript raises errors where I expect it to.

test(
  'StringIndexedObject',
  t => {
    const sio: StringIndexedObject = {
      a: 'hello',
      b: 99
    }
    t.is( sio.a, 'hello' )
    t.is( sio.b, 99 )
  }
)

test(
  'StringIndexedObject<number>',
  t => {
    const sio: StringIndexedObject<number> = {
      // a: 'hello',    // not allowed
      b: 99
    }
    // t.is( sio.a, 'hello' )
    t.is( sio.b, 99 )
  }
)

test(
  'SplitList(string)',
  t => {
    const list = splitList('a b c')
    t.is( list[0], 'a' )
  }
)

test(
  'SplitList([string, string])',
  t => {
    const list = splitList(['a', 'b ', 'c'])
    t.is( list[0], 'a' )
  }
)

test(
  'SplitList([number, number])',
  t => {
    const list = splitList([10, 20])
    t.is( list[0], '10' )
  }
)

/*
test(
  'SplitList([object, object])',
  t => {
    const list = splitList<{ a: number }>([{ a: 10 }, { a: 20 }])
    t.is( list[0].a, 10 )
  }
)
*/

test(
  'SplitHash',
  t => {
    const hash = splitHash(['a', 'b', 'c'])
    t.is( hash.a, true )
  }
)

/*
 * const strings = splitList('one two three')
 * const strings = splitList('one,two,three')
 * const strings = splitList('one, two, three')
export function splitList(
  value: ListSource,
  regex: RegExp=/,\s*|\s+/
): unknown[] {
  if (noValue(value)) {
    return [ ]
  }
  else if (isString(value)) {
    return value.length
      ? value.split(regex)
      : [ ]
  }
  else if (isArray(value)) {
    return value as unknown[]
  }
  return [value]
}
*/
