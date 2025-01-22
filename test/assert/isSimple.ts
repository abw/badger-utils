import test from '@/test/library/ava-vitest'
import { isSimple } from '@/src/index'

// isSimple()
test(
  'isSimple string',
  t => t.true(isSimple('hello'))
)
test(
  'isSimple integer',
  t => t.true(isSimple(11))
)
test(
  'isSimple float',
  t => t.true(isSimple(23.45))
)
test(
  'isSimple true',
  t => t.true(isSimple(true))
)
test(
  'isSimple false',
  t => t.true(isSimple(false))
)
test(
  'isSimple object',
  t => t.false(isSimple({ }))
)
test(
  'isSimple array',
  t => t.false(isSimple([ ]))
)
test(
  'isSimple function',
  t => t.false(isSimple(() => 23))
)
test(
  'isSimple null',
  t => t.false(isSimple(null))
)
test(
  'isSimple() asserts simple number type',
  t => {
    type Thing = {
      x: number
    }
    function maybe(a: number | Thing): number {
      return isSimple(a)
        ? a
        : a.x
    }
    t.is( maybe(5), 5 )
    t.is( maybe({ x: 42 }), 42 )
  }
)

test(
  'isSimple() asserts simple number, string or boolean type',
  t => {
    type Thing = {
      x: number | string | boolean
    }
    function maybe(a: number | string | boolean | Thing): number | string | boolean {
      return isSimple(a)
        ? a
        : a.x
    }
    t.is( maybe(11), 11 )
    t.is( maybe('eleven'), 'eleven' )
    t.is( maybe(true), true )
    t.is( maybe({ x: 11 }), 11 )
    t.is( maybe({ x: 'eleven' }), 'eleven' )
    t.is( maybe({ x: true }), true )
  }
)
