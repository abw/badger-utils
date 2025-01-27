import test from '../library/ava-vitest'
import { commas } from '../../src/index'

//-----------------------------------------------------------------------------
// commas()
//-----------------------------------------------------------------------------
test(
  'commas(123)',
  t => t.is(commas(123), '123')
)
test(
  'commas(12345)',
  t => t.is(commas(12345), '12,345')
)
test(
  'commas(12345.67)',
  t => t.is(commas(12345.67), '12,345.67')
)
test(
  'commas(12345.67, " ")',
  t => t.is(commas(12345.67, ' '), '12 345.67')
)
test(
  'commas()',
  // @ts-expect-error - commas() expects arguments
  t => t.is(commas(), '')
)
