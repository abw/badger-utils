import test from 'ava';
import {
  objMap, objSubset
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

// objSubset()
test(
  'objSubset()',
  t => {
    const out = objSubset({ a: 'alpha', b: 'bravo', c: 'charlie' }, 'a b');
    t.is(out.a, 'alpha');
    t.is(out.b, 'bravo');
    t.is(Object.keys(out).length, 2);
  }
);