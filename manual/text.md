# Text

Various utility functions for working with text.

## splitList(value)

Function to split a string of words into an array.  Words can
be delimited by commas and/or spaces.

```js
splitList("foo bar baz")    // ["foo", "bar", "baz"]
splitList("foo,bar,baz")    // ["foo", "bar", "baz"]
splitList("foo, bar, baz")  // ["foo", "bar", "baz"]
```

## joinList(array, joint=' ', lastJoint=joint)

Function to join an array of strings into a single string.  The
default delimiter is a single space.

```js
joinList(["Tom", "Dick", "Harry"])
    // => "Tom Dick Harry"
```

A delimiter can be provided as a second argument.

```js
joinList(["Tom", "Dick", "Harry"], ", ")
    // "Tom, Dick, Harry"
```

A final delimiter can be provided as a third argument

```js
joinList(["Tom", "Dick", "Harry"], ", ", " and ")
    // "Tom, Dick and Harry"
```

## joinListAnd(array, joint=', ', lastJoint=' and ')

A wrapper around the [JoinList()](#joinlist-array--joint---39----39---lastjoint-joint-)
function which defaults the `joint` to `', '` and the `lastJoint` to `' and '`

```js
joinListAnd(["Tom", "Dick", "Harry"])
    // "Tom, Dick and Harry"
```

## joinListOr(array, joint=', ', lastJoint=' or ')

A wrapper around the [JoinList()](#joinlist-array--joint---39----39---lastjoint-joint-)
function which defaults the `joint` to `', '` and the `lastJoint` to `' or '`

```js
joinListAnd(["Tom", "Dick", "Harry"])
    // "Tom, Dick or Harry"
```

## capitalise(word) / capitalize(word)

This function (provided with spellings in both British and American English)
capitalises a word.  The first character will be convert to upper case and
the remaining characters to lower case.

```js
capitalise("badger")    // => Badger
capitalise("BADGER")    // => Badger
```

## capitaliseWords(string) / capitalizeWords(string)

This function (provided with spellings in both British and American English)
capitalises all words in a string.

```js
capitalise("badger mushroom snake")    // => Badger Mushroom Snake
capitalise("BADGER MUSHROOM SNAKE")    // => Badger Mushroom Snake
```

## snakeToStudly(snake)

This function converts a snake case string (e.g. `badger_mushroom_snake`)
to studly caps (e.g. `BadgerMushroomSnake`)

```js
snakeToStudly("badger_mushroom_snake") // => BadgerMushroomSnake
```

## snakeToCamel(snake)

This function converts a snake case string (e.g. `badger_mushroom_snake`)
to camel case (e.g. `badgerMushroomSnake`)

```js
snakeToCamel("badger_mushroom_snake") // => badgerMushroomSnake
```

## pluralise(singular) / pluralize(singular)

This is a **very** simple function for pluralising English words.

It only works on words with standard endings and plural forms,
because pluralising words is notoriously difficult.  So don't
expect words like `woman`, `goose` or `sheep` to pluralise correctly.

```js
pluralise("badger") // => "badgers"
pluralise("doggy")  // => "doggies"
pluralise("grass")  // => "grasses"
pluralise("lash")   // => "lashes"
pluralise("watch")  // => "watches"
pluralise("box")    // => "boxes"
```

## inflect(n, singular, plural, no='no')

This function takes a number and a singular noun and attempts to
construct a correct plural form.  It is only likely to work with
English or languages that work similar to English in using the plural
form for zero or more than one item (e.g. "no badger**s**", "2 badger**s**")
and singular form for exactly one item (e.g. "1 badger").

```js
inflect(0, "badger")   // "no badgers"
inflect(1, "badger")   // "1 badger"
inflect(2, "badger")   // "2 badgers"
```

It uses the [pluralise()](#pluralise-singular----pluralize-singular-) function
to construct the plural form.  The plural form can be provided as an optional
third argument if that fails to do the right thing.

```js
inflect(0, "goose", "geese")   // "no geese"
inflect(1, "goose", "geese")   // "1 goose"
inflect(2, "goose", "geese")   // "2 geese"
```

When `n` is zero, it will use `no` instead of the number `0`.  An optional
fourth argument can be provided to change this.

```js
inflect(0, "goose", "geese", "none more")   // "none more geese"
```

## Inflect(n, singular, plural, no='No')

This is a wrapper around the [inflect()](#inflect-n--singular--plural--no---39-no--39--)
function which capitalised the first letter, e.g. returning `"No badgers"` rather
than `"no badgers"`.

```js
Inflect(0, "badger")   // "No badgers"
```

## splitLines(text)

This function splits a text string into lines.  Any blank lines are ignored.

```js
splitLines("foo\nbar\n\n\nbaz")
    // => ["foo", "bar", "baz"]