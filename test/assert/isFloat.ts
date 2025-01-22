import test from '@/test/library/ava-vitest'
import { isFloat } from '@/src/index'

// isFloat()
test(
  'isFloat() identifies integer',
  t => t.false(isFloat(42))
)
test(
  'isFloat() identifies float',
  t => t.true(isFloat(42.43))
)
test(
  'isFloat() identifies float with zero decimal part',
  t => t.false(isFloat(42.0))
)
test(
  'isFloat() identifies string',
  t => t.false(isFloat('42'))
)
test(
  'isFloat() identifies undefined',
  // @ts-expect-error - isFloat() expects a value
  t => t.false(isFloat())
)
test(
  'isFloat() asserts number type',
  t => {
    function addOne(a: string | number) {
      if (isFloat(a)) {
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
