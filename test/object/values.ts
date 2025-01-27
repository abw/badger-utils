import test from '../library/ava-vitest'
import { values } from '../../src/index'

test(
  'values()',
  t => {
    const object = { a: 'alpha', b: 'bravo', c: 'charlie' }
    t.deepEqual(values(object), ['alpha', 'bravo', 'charlie'])
  }
)
