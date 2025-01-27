import test from '../library/ava-vitest'
import { capitaliseWords, capitalizeWords } from '../../src/index'

test(
  'capitaliseWords("foo bar")',
  t => t.is(capitaliseWords('foo bar'), 'Foo Bar')
)

test(
  'capitaliseWords("FOO BAR")',
  t => t.is(capitaliseWords('FOO BAR'), 'Foo Bar')
)

test(
  'capitalizeWords("foo bar")',
  t => t.is(capitalizeWords('foo bar'), 'Foo Bar')
)

test(
  'capitalizeWords("FOO BAR")',
  t => t.is(capitalizeWords('FOO BAR'), 'Foo Bar')
)

