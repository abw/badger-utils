import test from '@/test/library/ava-vitest'
import { maybeFunction } from '@/src/index'

test(
  'maybeFunction() should call function',
  t => t.is(
    maybeFunction((a: number, b: number) => a + b, 10, 20),
    30
  )
)

test(
  'maybeFunction() should return non-function value',
  t => t.is(
    maybeFunction('nope', 20, 30),
    'nope'
  )
)

test(
  'maybeFunction() should assert type',
  t => {
    type AddFunction = (n: number) => number
    type Adder = number | AddFunction
    const addOne = (n: number) => n + 1
    const maybeAdd = (adder: Adder, n: number) =>
      maybeFunction(adder, n)

    t.is(
      maybeAdd(10, 1),
      10
    )
    t.is(
      maybeAdd(addOne, 10),
      11
    )
  }
)

