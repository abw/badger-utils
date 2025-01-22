import test from '@/test/library/ava-vitest'
import { isObject } from '@/src/index'

test(
  'isObject() identifies class instance',
  t => t.true(isObject(new Date()))
)
test(
  'isObject() identifies "hash table"',
  t => t.true(isObject({ b: 'badger' }))
)
test(
  'isObject() identifies array',
  t => t.false(isObject([10, 20]))
)
test(
  'isObject() identifies null',
  t => t.false(isObject(null))
)
test(
  'isObject() asserts object type',
  t => {
    function whatNumber(a: { n: number } | number) {
      if (isObject(a)) {
        return a.n
      }
      else {
        return a
      }
    }
    t.is( whatNumber(1), 1 )
    t.is( whatNumber({ n: 2 }), 2 )
  }
)
