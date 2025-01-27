import test from '../library/ava-vitest'
import { keys } from '../../src/index'

test(
  'keys()',
  t => {
    const object = { a: 'alpha', b: 'bravo', c: 'charlie' }
    t.deepEqual(keys(object), ['a', 'b', 'c'])
  }
)
