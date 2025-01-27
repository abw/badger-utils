import test from '../library/ava-vitest'
import { booleanField, } from '../../src/index'

test(
  'booleanField({ a: true, b: false }, "a")',
  t => t.is(
    booleanField({ a: true, b: false }, 'a'),
    true
  )
)
test(
  'booleanField({ a: true, b: false }, "b")',
  t => t.is(
    booleanField({ a: true, b: false }, 'b'),
    false
  )
)
test(
  'booleanField({ a: 1, b: 0 }, "a")',
  t => t.is(
    booleanField({ a: 1, b: 0 }, 'a'),
    true
  )
)
test(
  'booleanField({ a: 1, b: 0 }, "b")',
  t => t.is(
    booleanField({ a: 1, b: 0 }, 'b'),
    false
  )
)
test(
  'booleanField({ a: { b: { c: true } } }, "a.b.c")',
  t => t.is(
    // @ts-expect-error - CBA to define data type
    booleanField({ a: { b: { c: true } } }, data => data.a.b.c),
    true
  )
)

