import test from '../library/ava-vitest'
import { isFunction } from '@/src/index'

test(
  'isFunction() identifies function',
  t => {
    function f(a: number) {
      return a + 1
    }
    t.true(isFunction(f))
  }
)
test(
  'isFunction() identifies arrow function',
  t => {
    const f = (a: number) => a + 1
    t.true(isFunction(f))
  }
)
test(
  'isFunction() identifies non-function',
  t => t.false(isFunction(1))
)
test(
  'isFunction() asserts function type',
  t => {
    function maybeCallThis(a: number | (() => number)) {
      if (isFunction(a)) {
        return a()
      }
      else {
        return a
      }
    }
    t.is( maybeCallThis(1), 1 )
    t.is( maybeCallThis(() => 2), 2 )
  }
)
test(
  'isFunction() asserts function type 2',
  t => {
    type Adder = (n: number) => number

    const maybeAdd = (a: number | Adder): number =>
      isFunction<Adder>(a)
        ? a(10)
        : a + 1

    t.is(maybeAdd(10), 11)
    t.is(maybeAdd(n => n + 1), 11)
    t.is(maybeAdd(n => n + 2), 12)
  }
)

test(
  'isFunction() asserts function type 3',
  t => {
    type ReturnNumber = (n: number) => number

    const someNumber = (a: number | ReturnNumber): number =>
      // isFunction<ReturnNumber>(a)
      isFunction<ReturnNumber>(a)
        ? a(10)
        : a

    const addOne: ReturnNumber = n => n + 1

    t.is(someNumber(10), 10)
    t.is(someNumber(addOne), 11)
  }
)
