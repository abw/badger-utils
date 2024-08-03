import test from './library/ava-vitest.js'
import { maybeFunction, identity, doNothing } from '../src/utils/function.js'

test(
  'maybeFunction() should call function',
  t => t.is(
    maybeFunction((a, b) => a + b, 10, 20),
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

function areEqual(a, b, coerce=identity) {
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
  t => t.is(doNothing(1, 2, 3), undefined)
)
