import test from '../library/ava-vitest'
import { range } from '../../src/index'

test(
  'range(0, 1)',
  t => {
    const r = range(0, 1)
    t.is(r.length, 2)
    t.is(r[0], 0)
    t.is(r[1], 1)
  }
)
test(
  'range(10, 11)',
  t => {
    const r = range(10, 11)
    t.is(r.length, 2)
    t.is(r[0], 10)
    t.is(r[1], 11)
  }
)
test(
  'range(100, 105)',
  t => {
    const r = range(100, 105)
    t.is(r.length, 6)
    t.is(r[0], 100)
    t.is(r[1], 101)
    t.is(r[2], 102)
    t.is(r[3], 103)
    t.is(r[4], 104)
    t.is(r[5], 105)
  }
)
test(
  'range(-2, 2)',
  t => {
    const r = range(-2, 2)
    t.is(r.length, 5)
    t.is(r[0], -2)
    t.is(r[1], -1)
    t.is(r[2], 0)
    t.is(r[3], 1)
    t.is(r[4], 2)
  }
)
test(
  'range(2, -2)',
  t => {
    const r = range(2, -2)
    t.is(r.length, 5)
    t.is(r[0], 2)
    t.is(r[1], 1)
    t.is(r[2], 0)
    t.is(r[3], -1)
    t.is(r[4], -2)
  }
)
test(
  'range(2, 8, 2)',
  t => {
    const r = range(2, 8, 2)
    t.is(r.length, 4)
    t.is(r[0], 2)
    t.is(r[1], 4)
    t.is(r[2], 6)
    t.is(r[3], 8)
  }
)
test(
  'range(8, 2, 2)',
  t => {
    const r = range(8, 2, 2)
    t.is(r.length, 4)
    t.is(r[0], 8)
    t.is(r[1], 6)
    t.is(r[2], 4)
    t.is(r[3], 2)
  }
)
test(
  'range(8, 2, -2)',
  t => {
    const r = range(8, 2, -2)
    t.is(r.length, 4)
    t.is(r[0], 8)
    t.is(r[1], 6)
    t.is(r[2], 4)
    t.is(r[3], 2)
  }
)
test(
  'range(-4, 4, 2)',
  t => {
    const r = range(-4, 4, 2)
    t.is(r.length, 5)
    t.is(r[0], -4)
    t.is(r[1], -2)
    t.is(r[2], 0)
    t.is(r[3], 2)
    t.is(r[4], 4)
  }
)
test(
  'range(4, -4, 2)',
  t => {
    const r = range(4, -4, 2)
    t.is(r.length, 5)
    t.is(r[0], 4)
    t.is(r[1], 2)
    t.is(r[2], 0)
    t.is(r[3], -2)
    t.is(r[4], -4)
  }
)
test(
  'range(4, -4, -2)',
  t => {
    const r = range(4, -4, 2)
    t.is(r.length, 5)
    t.is(r[0], 4)
    t.is(r[1], 2)
    t.is(r[2], 0)
    t.is(r[3], -2)
    t.is(r[4], -4)
  }
)
