import test from '../library/ava-vitest'
import { numberField } from '../../src/index'

test(
  'numberField({ pi: 3.14 }, "pi")',
  t => t.is(
    numberField({ pi: 3.14 }, 'pi'),
    3.14
  )
)
test(
  'numberField({ pi: "3.14" }, "pi")',
  t => t.is(
    numberField({ pi: '3.14' }, 'pi'),
    3.14
  )
)
test(
  'numberField({ pi: 3 }, "pi")',
  t => t.is(
    numberField({ pi: 3 }, 'pi'),
    3
  )
)
test(
  'numberField({ pi: "3.14" }, "e")',
  t => t.is(
    numberField({ pi: '3.14' }, 'e'),
    0
  )
)
test(
  'numberField({ a: { b: { c: "3.14" } } }, "a.b.c")',
  t => t.is(
    // @ts-expect-error - CBA to define data type
    numberField({ a: { b: { c: '3.14' } } }, data => data.a.b.c),
    3.14
  )
)
