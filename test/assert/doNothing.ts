import test from '@/test/library/ava-vitest'
import { doNothing } from '@/src/index'

test(
  'doNothing(1, 2, 3)',
  t => t.is(doNothing(1, 2, 3), undefined)
)
