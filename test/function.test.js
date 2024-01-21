import test from 'ava';
import { maybeFunction } from '../src/utils/function.js';

test(
  'maybeFunction() should call function',
  t => t.is(
    maybeFunction((a, b) => a + b, 10, 20),
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
