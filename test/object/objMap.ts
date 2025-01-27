import test from '../library/ava-vitest'
import { objMap } from '../../src/index'

test(
  'objMap() uppercase',
  t => {
    const out = objMap(
      { a: 'alpha', b: 'bravo' },
      v => (v as string).toUpperCase()
    )
    t.is(out.a, 'ALPHA')
    t.is(out.b, 'BRAVO')
  }
)
