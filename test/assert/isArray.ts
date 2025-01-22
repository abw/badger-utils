import test from '@/test/library/ava-vitest'
import { isArray } from '@/src/index'

test(
  'isArray() identifies arrays',
  t => t.true(isArray([1,2,3]))
)
test(
  'isArray() identifies non-arrays',
  t => t.false(isArray(123))
)
test(
  'isArray() identifies null',
  t => t.false(isArray(null))
)
test(
  'isArray() asserts array type',
  t => {
    function howLong(a: number | number[]) {
      if (isArray(a)) {
        return a.length
      }
      else {
        return a
      }
    }
    t.is( howLong(5), 5 )
    t.is( howLong([1,2,3]), 3 )
  }
)
