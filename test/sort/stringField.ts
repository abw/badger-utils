import test from '../library/ava-vitest'
import { stringField } from '../../src/index'

test(
  'stringField({ pi: 3.14 }, "pi")',
  t => t.is(
    stringField({ pi: 3.14 }, 'pi'),
    '3.14'
  )
)

test(
  'stringField({ pi: "3.14" }, "pi")',
  t => t.is(
    stringField({ pi: '3.14' }, 'pi'),
    '3.14'
  )
)

test(
  'stringField({ pi: "3.14" }, "e")',
  t => t.is(
    stringField({ pi: '3.14' }, 'e'),
    ''
  )
)

test(
  'stringField({ a: { b: { c: "3.14" } } }, "a.b.c")',
  t => t.is(
    // @ts-expect-error - CBA to define data type
    stringField({ a: { b: { c: '3.14' } } }, data => data.a.b.c),
    '3.14'
  )
)

