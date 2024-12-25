import { test, expect, TestFunction } from 'vitest'

// Adapter for running test written for Ava using Vitest.
// NOTE: this only supports the subset of Ava functions that I'm using.

type TestWrapper = {
  is: (input: any, expected: any) => void,
  true: (input: any) => void,
  false: (input: any) => void,
  deepEqual: (input: any, expected: any) => void,
  throws: (input: any, expected?: { message?: string }) => void,
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
  throws: (fn, expected={}) => {
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

const AvaVitest = (name: any, fn: (input: any) => void) =>
  test(name, () => fn(t))

export default AvaVitest