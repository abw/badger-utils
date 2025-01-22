import test from '@/test/library/ava-vitest'
import { noValue } from '@/src/index'

test(
  'noValue identifies nothing = true',
  // @ts-expect-error - noValue() expects a value
  t => t.true(noValue())
)
test(
  'noValue identifies undefined = true',
  t => t.true(noValue(undefined))
)
test(
  'noValue identifies null = true',
  t => t.true(noValue(null))
)
test(
  'noValue identifies false = false',
  t => t.false(noValue(false))
)
test(
  'noValue identifies 0 = true',
  t => t.false(noValue(0))
)
test(
  'noValue() asserts non-value type',
  t => {
    function maybe(a: number | null | undefined): number {
      return noValue(a)
        ? 42
        : a
    }
    t.is( maybe(5), 5 )
    t.is( maybe(null), 42 )
    t.is( maybe(undefined), 42 )
  }
)
