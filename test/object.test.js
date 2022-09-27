import test from 'ava';
import {
  objMap, extract, remove
} from '../src/utils/object.js'

// objMap()
test(
  'objMap() uppercase',
  t => {
    const out = objMap({ a: 'alpha', b: 'bravo' }, v => v.toUpperCase());
    t.is(out.a, 'ALPHA');
    t.is(out.b, 'BRAVO');
  }
);

// extract()
test(
  'extract() with hash',
  t => {
    const object = { a: 10, b: 20, c: 30 };
    const extracted = extract(object, { a: true, b: false });
    t.deepEqual(object, { b: 20, c: 30 });
    t.deepEqual(extracted, { a: 10 });
  }
)

test(
  'extract() with array',
  t => {
    const object = { a: 10, b: 20, c: 30, d: 40 };
    const extracted = extract(object, ['a', 'b']);
    t.deepEqual(object, { c: 30, d: 40 });
    t.deepEqual(extracted, { a: 10, b: 20 });
  }
)

test(
  'extract() with string',
  t => {
    const object = { a: 10, b: 20, c: 30, d: 40 };
    const extracted = extract(object, 'a b');
    t.deepEqual(object, { c: 30, d: 40 });
    t.deepEqual(extracted, { a: 10, b: 20 });
  }
)

test(
  'extract() with function',
  t => {
    const object = { a: 10, b: 20, c: 30, d: 40 };
    const extracted = extract(object, k => k === 'a' || k === 'b');
    t.deepEqual(object, { c: 30, d: 40 });
    t.deepEqual(extracted, { a: 10, b: 20 });
  }
)

test(
  'extract() with regex',
  t => {
    const object = { aa: 10, ab: 20, bc: 30, bd: 40 };
    const extracted = extract(object, /^a/);
    t.deepEqual(object, { bc: 30, bd: 40 });
    t.deepEqual(extracted, { aa: 10, ab: 20 });
  }
)


// remove()
test(
  'remove()',
  t => {
    let object = { aa: 10, ab: 20, bc: 30, bd: 40 };
    let removed = remove(object, 'aa');
    t.deepEqual(object, { ab: 20, bc: 30, bd: 40 });
    t.is(removed, 10);
  }
)
