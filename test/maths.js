import test from './library/ava-vitest.js'
import { multiply, divide, add, subtract, clamp } from '../src/utils/maths.js'

test(
  'multiply(3.0, 2.2)',
  t => t.is(multiply(3.0, 2.2), 6.6)
)

test(
  'multiply(-3.14, 3)',
  t => t.is(multiply(-3.14, 3), -9.42)
)

test(
  'multiply(3.0, 2.2, 2.0)',
  t => t.is(multiply(3.0, 2.2, 2.0), 13.2)
)

test(
  'divide(6.6, 2.2)',
  t => t.is(divide(6.6, 2.2), 3)
)

test(
  'divide(-14.08, 3.2)',
  t => t.is(divide(-14.08, 3.2), -4.4)
)
test(
  'divide(13.2, 2.0, 1.1)',
  t => t.is(divide(13.2, 2.0, 1.1), 6)
)

test(
  'add(2.2, 2.2, 2.2)',
  t => t.is(add(2.2, 2.2, 2.2), 6.6)
)

test(
  'add(-3.14, -3.14, -3.14)',
  t => t.is(add(-3.14, -3.14, -3.14), -9.42)
)
test(
  'add(1.1, 6.6, 0.1)',
  t => t.is(add(1.1, 6.6, 0.1), 7.8)
)

test(
  'subtract(6.6, 2.2)',
  t => t.is(subtract(6.6, 2.2), 4.4)
)

test(
  'subtract(3.14, 9.42)',
  t => t.is(subtract(3.14, 9.42), -6.28)
)

test(
  'subtract(-3.14, 6.28)',
  t => t.is(subtract(-3.14, 6.28), -9.42)
)

test(
  'subtract(7.8, 0.1, 2.4)',
  t => t.is(subtract(7.8, 0.1, 2.4), 5.3)
)

test(
  'clamp(5, 1, 10)',
  t => t.is(clamp(5, 1, 10), 5)
)

test(
  'clamp(11, 1, 10)',
  t => t.is(clamp(11, 1, 10), 10)
)

test(
  'clamp(-1, 1, 10)',
  t => t.is(clamp(-1, 1, 10), 1)
)

test(
  'clamp(0.5, 0, 1)',
  t => t.is(clamp(0.5, 0, 1), 0.5)
)

/*
// Examples of cases that fail
test(
  'multiply(0.55, 100)',
  t => t.is(multiply(0.55, 100), 55)
)


test(
  'clamp(1.5, 0, 1)',
  t => {
    t.is(clamp(1.5, 0, 1), 1)
  }
)
*/
