import test from '../library/ava-vitest'
import { entries } from '../../src/index'

test(
  'entries()',
  t => {
    const object = { a: 'alpha', b: 'bravo', c: 'charlie' }
    t.deepEqual(entries(object), [['a', 'alpha'], ['b', 'bravo'], ['c', 'charlie']])
  }
)
