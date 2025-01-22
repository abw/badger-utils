import test from '@/test/library/ava-vitest'
import { isEmpty } from '@/src/index'

test(
  'isEmpty on empty object',
  t => t.true(isEmpty({ }))
)
test(
  'isEmpty on empty array',
  t => t.true(isEmpty([ ]))
)
test(
  'isEmpty on non-empty object',
  t => t.false(isEmpty({ a: 10 }))
)
test(
  'isEmpty on non-empty array',
  t => t.false(isEmpty([ 10 ]))
)
