import test from '../library/ava-vitest'
import { getField } from '../../src/index'

test(
  'field({ a: { b: { c: 10 } } }, "a.b.c")',
  t => t.is(
    // @ts-expect-error - CBA to define data type
    getField({ a: { b: { c: '10' } } }, data => data.a.b.c),
    '10'
  )
)

