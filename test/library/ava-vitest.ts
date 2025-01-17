import { test, expect } from 'vitest'

// Adapter for running test written for Ava using Vitest.
// NOTE: this only supports the subset of Ava functions that I'm using.

type TestWrapper = {
  is: (input: unknown, expected: unknown) => void,
  true: (input: unknown) => void,
  false: (input: unknown) => void,
  deepEqual: (input: unknown, expected: unknown) => void,
  throws: (input: () => void, expected?: { message?: string }) => void,
}

const t: TestWrapper = {
  is: (input, expected) =>
    expect(input).toBe(expected),
  deepEqual: (input, expected) =>
    expect(input).toStrictEqual(expected),
  true: input =>
    expect(input).toBe(true),
  false: input =>
    expect(input).toBe(false),
  throws: (fn: () => void, expected={}) => {
    try {
      fn()
    }
    catch (e) {
      if (expected.message) {
        expect(e.message).toBe(expected.message)
      }
      return e
    }
  }
}

const AvaVitest = (
  name: string,
  fn: (t: TestWrapper) => void
) =>
  test(name, () => fn(t))

export default AvaVitest