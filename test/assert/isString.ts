import test from '@/test/library/ava-vitest'
import { isString } from '@/src/index'


test(
  'isString() identifies string',
  t => t.true(isString('foo'))
)
test(
  'isString() identifies number',
  t => t.false(isString(123))
)
test(
  'isString() identifies undefined',
  // @ts-expect-error - isString() expects a value but we want to check undefined
  t => t.false(isString())
)
test(
  'isString() asserts string type',
  t => {
    function foo(a: string | number) {
      if (isString(a)) {
        return a.length
      }
      else {
        return a
      }
    }
    t.is( foo('hello'), 5 )
    t.is( foo(4), 4 )
  }
)

