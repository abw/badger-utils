import test from '@/test/library/ava-vitest'
import { isNumber } from '@/src/index'

test(
  'isNumber() identifies integer',
  t => t.true(isNumber(42))
)
test(
  'isNumber() identifies float',
  t => t.true(isNumber(42.43))
)
test(
  'isNumber() identifies string',
  t => t.false(isNumber('42'))
)
test(
  'isNumber() identifies undefined',
  // @ts-expect-error - isNumber() expects a value
  t => t.false(isNumber())
)
test(
  'isNumber() asserts number type',
  t => {
    function addOne(a: string | number) {
      if (isNumber(a)) {
        return a + 1
      }
      else {
        return parseFloat(a) + 1
      }
    }
    t.is( addOne(5), 6 )
    t.is( addOne('6'), 7 )
  }
)
