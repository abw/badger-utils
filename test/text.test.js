import test from 'ava';
import {
  capitalise, capitaliseWords, snakeToStudly, snakeToCamel,
  splitList, joinList, joinListAnd, joinListOr, splitLines, splitHash,
  plural, singular, inflect
} from '../src/index.js'

// capitalise
test(
  'capitalise foo => Foo',
  t => t.is(capitalise('foo'), 'Foo')
);
test(
  'capitalise FOO => Foo',
  t => t.is(capitalise('FOO'), 'Foo')
);

// capitaliseWords
test(
  'capitaliseWords("foo bar")',
  t => t.is(capitaliseWords('foo bar'), 'Foo Bar')
);
test(
  'capitaliseWords("FOO BAR")',
  t => t.is(capitaliseWords('FOO BAR'), 'Foo Bar')
);

// snakeToStudly
test(
  'snakeToStudly foo => Foo',
  t => t.is(snakeToStudly('foo'), 'Foo')
);
test(
  'snakeToStudly foo_bar => FooBar',
  t => t.is(snakeToStudly('foo_bar'), 'FooBar')
);
test(
  'snakeToStudly foo_bar/baz_waz => FooBar/BazWaz',
  t => t.is(snakeToStudly('foo_bar/baz_waz'), 'FooBar/BazWaz')
);

// snakeToCamel
test(
  'snakeToCamel foo => Foo',
  t => t.is(snakeToCamel('foo'), 'foo')
);
test(
  'snakeToCamel foo_bar => FooBar',
  t => t.is(snakeToCamel('foo_bar'), 'fooBar')
);
test(
  'snakeToCamel foo_bar/baz_waz => fooBar/BazWaz',
  t => t.is(snakeToCamel('foo_bar/baz_waz'), 'fooBar/bazWaz')
);

// splitList
test(
  'splitList no value',
  t => {
    const list = splitList(undefined);
    t.is( list.length, 0);
  }
)
test(
  'splitList empty string',
  t => {
    const list = splitList("");
    t.is( list.length, 0);
  }
)
test(
  'splitList array',
  t => {
    const list = splitList(['foo', 'bar']);
    t.is( list.length, 2);
    t.is( list[0], 'foo');
    t.is( list[1], 'bar');
  }
)
test(
  'splitList text with spaces',
  t => {
    const list = splitList("foo bar   baz\twiz\nwaz\t \n \t  \nwoz");
    t.is( list.length, 6);
    t.is( list[0], 'foo');
    t.is( list[1], 'bar');
    t.is( list[2], 'baz');
    t.is( list[3], 'wiz');
    t.is( list[4], 'waz');
    t.is( list[5], 'woz');
  }
)
test(
  'splitList text with commas',
  t => {
    const list = splitList("foo,bar, baz,\twiz,\nwaz,\t \n \t  \nwoz");
    t.is( list.length, 6);
    t.is( list[0], 'foo');
    t.is( list[1], 'bar');
    t.is( list[2], 'baz');
    t.is( list[3], 'wiz');
    t.is( list[4], 'waz');
    t.is( list[5], 'woz');
  }
)

// joinList
test(
  'joinList with default spaces',
  t => t.is(joinList(["foo", "bar", "baz"]), "foo bar baz")
)
test(
  'joinList with commas',
  t => t.is(joinList(["foo", "bar", "baz"], ", "), "foo, bar, baz")
)
test(
  'joinList with commas and "and"',
  t => t.is(joinList(["foo", "bar", "baz"], ", ", " and "), "foo, bar and baz")
)
test(
  'joinListAnd',
  t => t.is(joinListAnd(["foo", "bar", "baz"]), "foo, bar and baz")
)
test(
  'joinListOr',
  t => t.is(joinListOr(["foo", "bar", "baz"]), "foo, bar or baz")
)

// splitLines
test(
  'splitLines no value',
  t => {
    const list = splitLines(undefined);
    t.is( list.length, 0);
  }
)
test(
  'splitLines empty string',
  t => {
    const list = splitLines("");
    t.is( list.length, 0);
  }
)
test(
  'splitLines with blank lines',
  t => {
    const list = splitLines("foo\nbar\n\nbaz");
    t.is( list.length, 3);
    t.is( list[0], 'foo');
    t.is( list[1], 'bar');
    t.is( list[2], 'baz');
  }
)

test(
  'splitHash({ a: true, b: true })',
  t => t.deepEqual(
    splitHash({ a: true, b: true }),
    { a: true, b: true }
  )
);

test(
  'splitHash({ a: 1, b: 2 })',
  t => t.deepEqual(
    splitHash({ a: 1, b: 2 }),
    { a: 1, b: 2 }
  )
);

test(
  'splitHash(["a", "b"])',
  t => t.deepEqual(
    splitHash(["a", "b"]),
    { a: true, b: true }
  )
);

test(
  'splitHash(["a", "b"], false)',
  t => t.deepEqual(
    splitHash(["a", "b"], false),
    { a: false, b: false }
  )
);

test(
  'splitHash(["a", "b"], undefined)',
  t => t.deepEqual(
    splitHash(["a", "b"], undefined),
    { a: true, b: true }
  )
);


test(
  'splitHash(["a", "b"], v => v)',
  t => t.deepEqual(
    splitHash(["a", "b"], v => v),
    { a: 'a', b: 'b' }
  )
);

test(
  'splitHash(["a", "b"], v => `=${v}=)',
  t => t.deepEqual(
    splitHash(["a", "b"], v => `=${v}=`),
    { a: '=a=', b: '=b=' }
  )
);

test(
  'splitHash(["a", "b"], undefined, { c: "hello" })',
  t => t.deepEqual(
    splitHash(["a", "b"], undefined, { c: "hello" }),
    { a: true, b: true, c: "hello" }
  )
);

// plural
test(
  "plural('badger')",
  t => t.is( plural('badger'), 'badgers' )
);
test(
  "plural('grass')",
  t => t.is( plural('grass'), 'grasses' )
);
test(
  "plural('bush')",
  t => t.is( plural('bush'), 'bushes' )
);
test(
  "plural('church')",
  t => t.is( plural('church'), 'churches' )
);
test(
  "plural('box')",
  t => t.is( plural('box'), 'boxes' )
);
test(
  "plural('lorry')",
  t => t.is( plural('lorry'), 'lorries' )
);
test(
  "plural('toy')",
  t => t.is( plural('toy'), 'toys' )
);
test(
  "plural('woman')",
  t => t.is( plural('woman'), 'womans' )
);
test(
  "plural('woman') with special case",
  t => t.is( plural('woman', { woman: 'women' }), 'women' )
);

// singular
test(
  "singular('badgers')",
  t => t.is( singular('badgers'), 'badger' )
);
test(
  "singular('grasses')",
  t => t.is( singular('grasses'), 'grass' )
);
test(
  "singular('bushes')",
  t => t.is( singular('bushes'), 'bush' )
);
test(
  "singular('churches')",
  t => t.is( singular('churches'), 'church' )
);
test(
  "singular('boxes')",
  t => t.is( singular('boxes'), 'box' )
);
test(
  "singular('lorries')",
  t => t.is( singular('lorries'), 'lorry' )
);
test(
  "singular('toys')",
  t => t.is( singular('toys'), 'toy' )
);
test(
  "singular('women')",
  t => t.is( singular('women'), 'women' )
);
test(
  "singular('women') with special case",
  t => t.is( singular('women', { women: 'woman' }), 'woman' )
);

// inflect
test(
  'inflect(0, "badger")',
  t => t.is( inflect(0, 'badger'), 'no badgers' )
);
test(
  'inflect(1, "badger")',
  t => t.is( inflect(1, 'badger'), '1 badger' )
)
test(
  'inflect(2, "badger")',
  t => t.is( inflect(2, 'badger'), '2 badgers' )
)
test(
  'inflect(0, "child", "children")',
  t => t.is( inflect(0, 'child', 'children'), 'no children' )
)
test(
  'inflect(1, "child", "children")',
  t => t.is( inflect(1, 'child', 'children'), '1 child' )
)
test(
  'inflect(2, "child", "children")',
  t => t.is( inflect(2, 'child', 'children'), '2 children' )
)
test(
  'inflect(0, "black", "black", "none, none more")',
  t => t.is( inflect(0, 'black', 'black', 'none, none more'), 'none, none more black' )
);

