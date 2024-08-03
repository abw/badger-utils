import test from './library/ava-vitest.js'
import {
  objMap, extract, remove, keys, values, entries
} from '../src/utils/object.js'

//----------------------------------------------------------------------------
// objMap()
//----------------------------------------------------------------------------
test(
  'objMap() uppercase',
  t => {
    const out = objMap({ a: 'alpha', b: 'bravo' }, v => v.toUpperCase())
    t.is(out.a, 'ALPHA')
    t.is(out.b, 'BRAVO')
  }
)

//----------------------------------------------------------------------------
// extract()
//----------------------------------------------------------------------------
test(
  'extract() with hash',
  t => {
    const object = { a: 10, b: 20, c: 30 }
    const extracted = extract(object, { a: true, b: false })
    t.deepEqual(object, { a: 10, b: 20, c: 30 })
    t.deepEqual(extracted, { a: 10 })
  }
)

test(
  'extract() with array',
  t => {
    const object = { a: 10, b: 20, c: 30, d: 40 }
    const extracted = extract(object, ['a', 'b'])
    t.deepEqual(object, { a: 10, b: 20, c: 30, d: 40 })
    t.deepEqual(extracted, { a: 10, b: 20 })
  }
)

test(
  'extract() with string',
  t => {
    const object = { a: 10, b: 20, c: 30, d: 40 }
    const extracted = extract(object, 'a b')
    t.deepEqual(object, { a: 10, b: 20, c: 30, d: 40 })
    t.deepEqual(extracted, { a: 10, b: 20 })
  }
)

test(
  'extract() with function',
  t => {
    const object = { a: 10, b: 20, c: 30, d: 40 }
    const extracted = extract(object, k => k === 'a' || k === 'b')
    t.deepEqual(object, { a: 10, b: 20, c: 30, d: 40 })
    t.deepEqual(extracted, { a: 10, b: 20 })
  }
)

test(
  'extract() with regex',
  t => {
    const object = { aa: 10, ab: 20, bc: 30, bd: 40 }
    const extracted = extract(object, /^a/)
    t.deepEqual(object, { aa: 10, ab: 20, bc: 30, bd: 40 })
    t.deepEqual(extracted, { aa: 10, ab: 20 })
  }
)

test(
  'extract() with hash delete',
  t => {
    const object = { a: 10, b: 20, c: 30 }
    const extracted = extract(object, { a: true, b: false }, { delete: true })
    t.deepEqual(object, { b: 20, c: 30 })
    t.deepEqual(extracted, { a: 10 })
  }
)

test(
  'extract() with array delete',
  t => {
    const object = { a: 10, b: 20, c: 30, d: 40 }
    const extracted = extract(object, ['a', 'b'], { delete: true })
    t.deepEqual(object, { c: 30, d: 40 })
    t.deepEqual(extracted, { a: 10, b: 20 })
  }
)

test(
  'extract() with string delete',
  t => {
    const object = { a: 10, b: 20, c: 30, d: 40 }
    const extracted = extract(object, 'a b', { delete: true })
    t.deepEqual(object, { c: 30, d: 40 })
    t.deepEqual(extracted, { a: 10, b: 20 })
  }
)

test(
  'extract() with function delete',
  t => {
    const object = { a: 10, b: 20, c: 30, d: 40 }
    const extracted = extract(object, k => k === 'a' || k === 'b', { delete: true })
    t.deepEqual(object, { c: 30, d: 40 })
    t.deepEqual(extracted, { a: 10, b: 20 })
  }
)

test(
  'extract() with regex delete',
  t => {
    const object = { aa: 10, ab: 20, bc: 30, bd: 40 }
    const extracted = extract(object, /^a/, { delete: true })
    t.deepEqual(object, { bc: 30, bd: 40 })
    t.deepEqual(extracted, { aa: 10, ab: 20 })
  }
)

test(
  'extract() with regex transform key',
  t => {
    const object = {
      DATABASE_USERNAME: 'badger',
      DATABASE_PASSWORD: 's3cr3t',
      ANOTHER_KEY_VALUE: 'hello',
    }
    const extracted = extract(
      object,
      /^DATABASE_/,
      {
        delete: true,
        key:    key => key.replace(/^DATABASE_/, '').toLowerCase()
      }
    )
    t.deepEqual(object, { ANOTHER_KEY_VALUE: 'hello' })
    t.deepEqual(extracted, { username: 'badger', password: 's3cr3t' })
  }
)

test(
  'extract() with regex transform value',
  t => {
    const ex_vat = {
      hire_ex_vat:     10.00,
      delivery_ex_vat: 2.00,
      delivery_note:   'Please knock loudly',
    }
    const inc_vat = extract(
      ex_vat,
      /_ex_vat$/,
      {
        key:    key => key.replace(/_ex_vat$/, '_inc_vat'),
        value:  value => value * 1.2,
      }
    )
    t.deepEqual(
      ex_vat,
      {
        hire_ex_vat:     10.00,
        delivery_ex_vat: 2.00,
        delivery_note:   'Please knock loudly',
      }
    )
    t.deepEqual(
      inc_vat,
      {
        hire_inc_vat:     12.00,
        delivery_inc_vat: 2.40,
      }
    )
  }
)


//----------------------------------------------------------------------------
// remove()
//----------------------------------------------------------------------------
test(
  'remove()',
  t => {
    let object = { aa: 10, ab: 20, bc: 30, bd: 40 }
    let removed = remove(object, 'aa')
    t.deepEqual(object, { ab: 20, bc: 30, bd: 40 })
    t.is(removed, 10)
  }
)

//----------------------------------------------------------------------------
// keys()
//----------------------------------------------------------------------------
test(
  'keys()',
  t => {
    let object = { a: 'alpha', b: 'bravo', c: 'charlie' }
    t.deepEqual(keys(object), ['a', 'b', 'c'])
  }
)

//----------------------------------------------------------------------------
// values()
//----------------------------------------------------------------------------
test(
  'values()',
  t => {
    let object = { a: 'alpha', b: 'bravo', c: 'charlie' }
    t.deepEqual(values(object), ['alpha', 'bravo', 'charlie'])
  }
)

//----------------------------------------------------------------------------
// entries()
//----------------------------------------------------------------------------
test(
  'entries()',
  t => {
    let object = { a: 'alpha', b: 'bravo', c: 'charlie' }
    t.deepEqual(entries(object), [['a', 'alpha'], ['b', 'bravo'], ['c', 'charlie']])
  }
)
