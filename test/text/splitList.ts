import test from '../library/ava-vitest'
import { splitList } from '../../src/index'

test(
  'splitList no value',
  t => {
    const list = splitList(undefined)
    t.is( list.length, 0)
  }
)

test(
  'splitList number',
  t => t.deepEqual(
    splitList(9),
    [9]
  )
)

test(
  'splitList empty string',
  t => {
    const list = splitList('')
    t.is( list.length, 0)
  }
)

test(
  'splitList array',
  t => {
    const list = splitList(['foo', 'bar'])
    t.is( list.length, 2)
    t.is( list[0], 'foo')
    t.is( list[1], 'bar')
  }
)

test(
  'splitList text with spaces',
  t => {
    const list = splitList('foo bar   baz\twiz\nwaz\t \n \t  \nwoz')
    t.is( list.length, 6)
    t.is( list[0], 'foo')
    t.is( list[1], 'bar')
    t.is( list[2], 'baz')
    t.is( list[3], 'wiz')
    t.is( list[4], 'waz')
    t.is( list[5], 'woz')
  }
)

test(
  'splitList text with commas',
  t => {
    const list = splitList('foo,bar, baz,\twiz,\nwaz,\t \n \t  \nwoz')
    t.is( list.length, 6)
    t.is( list[0], 'foo')
    t.is( list[1], 'bar')
    t.is( list[2], 'baz')
    t.is( list[3], 'wiz')
    t.is( list[4], 'waz')
    t.is( list[5], 'woz')
  }
)

test(
  'splitList text with commas and custom regex',
  t => {
    const list = splitList('foo,bar baz,wiz\nwaz,woz', /\s+/)
    t.is( list.length, 3)
    t.is( list[0], 'foo,bar')
    t.is( list[1], 'baz,wiz')
    t.is( list[2], 'waz,woz')
  }
)
