import test from '../library/ava-vitest'
import { splitLines } from '../../src/index'

test(
  'splitLines no value',
  t => {
    const list = splitLines(undefined)
    t.is( list.length, 0)
  }
)

test(
  'splitLines empty string',
  t => {
    const list = splitLines('')
    t.is( list.length, 0)
  }
)

test(
  'splitLines with blank lines',
  t => {
    const list = splitLines('foo\nbar\n\nbaz')
    t.is( list.length, 3)
    t.is( list[0], 'foo')
    t.is( list[1], 'bar')
    t.is( list[2], 'baz')
  }
)
