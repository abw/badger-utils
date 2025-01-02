import test from './library/ava-vitest'
import { maybeFunction, identity, doNothing, isFunction } from '../src/index'

test(
  'maybeFunction() should call function',
  t => t.is(
    maybeFunction((a: number, b: number) => a + b, 10, 20),
    30
  )
)

test(
  'maybeFunction() should return non-function value',
  t => t.is(
    maybeFunction('nope', 20, 30),
    'nope'
  )
)

test(
  'identity() should return value',
  t => t.is(
    identity(10),
    10
  )
)
test(
  'identity() should return typed value',
  t => {
    //function theNumber(a: number): number {
    //  return identity(a)
    //}
    const a = identity( (b: number): number => b + 1 )
    const b = a(10)
    t.is(b, 11)
    const c = identity(10)
    t.is(c, 10)
    const d = isFunction(c)
      ? c(20)
      : 42
    t.is(d, 42)
  }
)

function areEqual(a: any, b: any, coerce: (x: any) => any = identity) {
  return coerce(a) === coerce(b)
}
test(
  'areEqual(true, true) should return true',
  t => t.true(areEqual(true, true))
)
test(
  'areEqual(true, 1) should return false',
  t => t.false(areEqual(true, 1))
)
test(
  'areEqual(true, 1, Boolean) should return true',
  t => t.true(areEqual(true, 1, Boolean))
)

test(
  'doNothing(1, 2, 3)',
  // @ts-ignore
  t => t.is(doNothing(1, 2, 3), undefined)
)
