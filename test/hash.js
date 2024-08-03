import test from './library/ava-vitest.js'
import { hash } from '../src/index'

const ab = { a: 'alpha', b: 'bravo' }
const cd = ['c', 'd']
const ef = 'e, f'
const gh = 'g h'
const ij = 'i,j'

test(
  'hash() pass-through',
  t => t.deepEqual(hash(ab), ab)
)

test(
  'hash() array',
  t => t.deepEqual(hash(cd), { c: true, d: true })
)

test(
  'hash() string with comma and space',
  t => t.deepEqual(hash(ef), { e: true, f: true })
)

test(
  'hash() string with space',
  t => t.deepEqual(hash(gh), { g: true, h: true })
)

test(
  'hash() string with comma',
  t => t.deepEqual(hash(ij), { i: true, j: true })
)

// include
test(
  'hash() with include on key',
  t => t.deepEqual(
    hash(ab, { include: k => k === 'a' }),
    { a: 'alpha' }
  )
)
test(
  'hash() with string include on key',
  t => t.deepEqual(
    hash(ab, { include: 'a' }),
    { a: 'alpha' }
  )
)
test(
  'hash() with include on value',
  t => t.deepEqual(
    hash(ab, { include: (k, v) => v === 'bravo' }),
    { b: 'bravo' }
  )
)
test(
  'hash() with include on source - true',
  t => t.deepEqual(
    hash({ a: 'alpha', yes: true }, { include: (k, v, s) => s.yes }),
    { a: 'alpha', yes: true }
  )
)
test(
  'hash() with include on source - false',
  t => t.deepEqual(
    hash({ a: 'alpha', yes: false }, { include: (k, v, s) => s.yes }),
    { }
  )
)

// exclude
test(
  'hash() with exclude on key',
  t => t.deepEqual(
    hash(ab, { exclude: k => k === 'b' }),
    { a: 'alpha' }
  )
)
test(
  'hash() with exclude string on key',
  t => t.deepEqual(
    hash(ab, { exclude: 'b' }),
    { a: 'alpha' }
  )
)
test(
  'hash() with exclude on value',
  t => t.deepEqual(
    hash(ab, { exclude: (k, v) => v === 'alpha' }),
    { b: 'bravo' }
  )
)
test(
  'hash() with exclude on source - true',
  t => t.deepEqual(
    hash({ a: 'alpha', yes: false }, { exclude: (k, v, s) => s.yes }),
    { a: 'alpha', yes: false }
  )
)
test(
  'hash() with exclude on source - false',
  t => t.deepEqual(
    hash({ a: 'alpha', yes: true }, { exclude: (k, v, s) => s.yes }),
    { }
  )
)

// key
test(
  'hash() with key',
  t => t.deepEqual(
    hash(ab, { key: k => k.toUpperCase() }),
    { A: 'alpha', B: 'bravo' }
  )
)

// value
test(
  'hash() with value',
  t => t.deepEqual(
    hash(ab, { value: v => v.toUpperCase() }),
    { a: 'ALPHA', b: 'BRAVO' }
  )
)
