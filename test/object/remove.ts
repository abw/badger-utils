import test from '../library/ava-vitest'
import { remove } from '../../src/index'

test(
  'remove()',
  t => {
    const object = { aa: 10, ab: 20, bc: 30, bd: 40 }
    const removed = remove(object, 'aa')
    t.deepEqual(object, { ab: 20, bc: 30, bd: 40 })
    t.is(removed, 10)
  }
)
