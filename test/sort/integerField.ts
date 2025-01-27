import test from '../library/ava-vitest'
import { integerField } from '../../src/index'

test(
  'integerField({ a: 10 }, "a")',
  t => t.is(
    integerField({ a: 10 }, 'a'),
    10
  )
)
test(
  'integerField({ a: "10" }, "a")',
  t => t.is(
    integerField({ a: '10' }, 'a'),
    10
  )
)
test(
  'integerField({ a: "10" }, "b")',
  t => t.is(
    integerField({ a: '10' }, 'b'),
    0
  )
)
test(
  'integerField({ a: { b: { c: 10 } } }, "a.b.c")',
  t => t.is(
    // @ts-expect-error - CBA to define data type
    integerField({ a: { b: { c: '10' } } }, data => data.a.b.c),
    10
  )
)
