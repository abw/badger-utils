import test from 'ava';
import {
  capitalise, capitaliseWords, snakeToStudly, snakeToCamel,
  splitList, joinList, joinListAnd, joinListOr, splitLines
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
