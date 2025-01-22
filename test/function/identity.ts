import test from '../library/ava-vitest'
import { identity, isFunction } from '@/src/index'

test(
  'identity() should return value',
  t => t.is(
    identity(10),
    10
  )
)
test(
  'identity() should return typed value',
  t => {
    //function theNumber(a: number): number {
    //  return identity(a)
    //}
    const a = identity( (b: number): number => b + 1 )
    const b = a(10)
    t.is(b, 11)
    const c = identity(10)
    t.is(c, 10)
    const d = isFunction(c)
      ? c(20)
      : 42
    t.is(d, 42)
  }
)

test(
  'identity() should accept type',
  t => {
    type Item = {
      name: string,
      price: number
    }
    // type FilterItems = (items: Item[]) => Item[]
    const sumItems = (items: Item[], filter=identity): number =>
      filter(items).reduce(
        (sum, item) => sum + item.price,
        0
      )
    const items = [
      { name: 'nuts', price: 1.23 },
      { name: 'berries', price: 2.34 },
      { name: 'carriage', price: 3.45 }
    ]
    const total = sumItems(items)
    t.is(total, 7.02)
  }
)

function areEqual(a: unknown, b: unknown, coerce: (x: unknown) => unknown = identity) {
  return coerce(a) === coerce(b)
}
test(
  'areEqual(true, true) should return true',
  t => t.true(areEqual(true, true))
)
test(
  'areEqual(true, 1) should return false',
  t => t.false(areEqual(true, 1))
)
test(
  'areEqual(true, 1, Boolean) should return true',
  t => t.true(areEqual(true, 1, Boolean))
)
