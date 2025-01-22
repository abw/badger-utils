import test from '@/test/library/ava-vitest'
import { isInteger } from '@/src/index'

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
  // @ts-expect-error - isInteger() expects a value
  t => t.false(isInteger())
)
test(
  'isInteger() asserts number type',
  t => {
    function addOne(a: string | number) {
      if (isInteger(a)) {
        return a + 1
      }
      else {
        return parseInt(a) + 1
      }
    }
    t.is( addOne(5), 6 )
    t.is( addOne('6'), 7 )
  }
)
