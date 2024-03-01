# Text

Functions for working with text.

## splitLines(text) {#splitLines}

This function splits a text string into lines.  Any blank lines are ignored.

```js
splitLines("foo\nbar\n\n\nbaz")
    // => ["foo", "bar", "baz"]
```

## splitList(value) {#splitList}

Function to split a string of words into an array.  Words can
be delimited by commas and/or spaces. If the argument is already
an array then the array is returned unmodified.

```js
splitList("foo bar baz")    // ["foo", "bar", "baz"]
splitList("foo,bar,baz")    // ["foo", "bar", "baz"]
splitList("foo, bar, baz")  // ["foo", "bar", "baz"]
```

An optional regular expression can be passed as a second argument if you
want to split using a different pattern.

## splitHash(value, set=true, hash={}) {#splitHash}

Function to split a string of whitespace delimited words, or an array of
words, into an object which can be used as a hash table for quick lookups.
The input is first passed to the [`splitList()`](#splitList) function.
It returns an object where the keys are the words extracted from the input
and the values are set to be `true`.

```js
splitHash("foo bar baz")    // { foo: true, bar: true, baz: true }
```

An optional second argument can be passed to set the value to be used for
the hash table values.

```js
splitHash("foo bar baz", 1)    // { foo: 1, bar: 1, baz: 1 }
```

This can be a function which will be passed the key and should return the
corresponding value.

```js
splitHash("foo bar baz", k => k)    // { foo: "foo", bar: "bar", baz: "baz" }
```

A third optional argument can be passed which is an object to populate with the
results.

```js
let stuff = { foo: "foo" }
splitHash("bar baz", k => k, stuff)    // { foo: "foo", bar: "bar", baz: "baz" }
```

## joinList(array, joint=' ', lastJoint=joint) {#joinList}

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

## joinListAnd(array, joint=', ', lastJoint=' and ') {#joinListAnd}

A wrapper around the [`JoinList()`](#joinList)
function which defaults the `joint` to `', '` and the `lastJoint` to `' and '`

```js
joinListAnd(["Tom", "Dick", "Harry"])
    // "Tom, Dick and Harry"
```

## joinListOr(array, joint=', ', lastJoint=' or ') {#joinListOr}

A wrapper around the [`JoinList()`](#joinList)
function which defaults the `joint` to `', '` and the `lastJoint` to `' or '`

```js
joinListAnd(["Tom", "Dick", "Harry"])
    // "Tom, Dick or Harry"
```

## capitalise(word) / capitalize(word) {#capitalise}

This function (provided with spellings in both British and American English)
capitalises a word.  The first character will be convert to upper case and
the remaining characters to lower case.

```js
capitalise("badger")    // => Badger
capitalise("BADGER")    // => Badger
```

## capitaliseWords(string) / capitalizeWords(string) {#capitaliseWords}

This function (provided with spellings in both British and American English)
capitalises all words in a string.

```js
capitalise("badger mushroom snake")    // => Badger Mushroom Snake
capitalise("BADGER MUSHROOM SNAKE")    // => Badger Mushroom Snake
```

## snakeToStudly(snake) {#snakeToStudly}

This function converts a snake case string (e.g. `badger_mushroom_snake`)
to studly caps, also known as Pascal case (e.g. `BadgerMushroomSnake`).

```js
snakeToStudly("badger_mushroom_snake") // => BadgerMushroomSnake
```

## snakeToCamel(snake) {#snakeToCamel}

This function converts a snake case string (e.g. `badger_mushroom_snake`)
to camel case (e.g. `badgerMushroomSnake`)

```js
snakeToCamel("badger_mushroom_snake") // => badgerMushroomSnake
```

## plural(singular) {#plural}

This is a **very** simple function for pluralising English words.

It only works on words with standard endings and plural forms,
because pluralising words is notoriously difficult.  So don't
expect words like `woman`, `goose` or `sheep` to pluralise correctly.

```js
plural("badger") // => "badgers"
plural("doggy")  // => "doggies"
plural("grass")  // => "grasses"
plural("lash")   // => "lashes"
plural("watch")  // => "watches"
plural("box")    // => "boxes"
```

If you do have special cases then you can pass them as the second
argument.  This is a simple lookup table mapping singular forms to
their plural forms for words that you might need to pluralise that
the basic function can't handle.

```js
const specialCases = {
  woman: "women",
  goose: "geese",
  sheep: "sheep"
}
plural("woman", specialCases) // => "women"
```
::: danger DEPRECATION NOTE
This function was originally called `pluralise()` with an alias of
`pluralize()` for our American friends who like the letter z.  It has been
renamed to `plural()`.  The `pluralise()` and `pluralize()` aliases still
exist but will be deprecated in a future version.
:::

## singular(plural) {#singular}

This is another **very** simple function for reversing the action
of the [`plural()`](#plural) function to return the singular form of a plural
noun.

It only works on words with standard endings and plural forms,
for the same reasons that [`plural()`](#plural) is limited.

```js
singular("badgers")  // => "badger"
singular("doggies")  // => "doggy"
singular("grasses")  // => "grass"
singular("lashes")   // => "lash"
singular("watches")  // => "watch"
singular("boxes")    // => "box"
```

It also supports a second argument for providing special cases to help
it out with words that have irregular pluralisations.

```js
const specialCases = {
  women: "woman",
  geese: "goose",
  sheep: "sheep"
}
singular("women", specialCases) // => "woman"
```

## inflect(n, singular, plural, no='no') {#inflect}

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

It uses the [`plural()`](#plural) function
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

## Inflect(n, singular, plural, no='No') {#Inflect}

This is a wrapper around the [`inflect()`](#inflect)
function which capitalises the first letter, e.g. returning `"No badgers"`
rather than `"no badgers"`.

```js
Inflect(0, "badger")   // "No badgers"
```

## format(message, data) {#format}

This implements a minimal template expansion function that inserts
data items into a message string.  Placeholders should be embedded
in the message string in angle brackets.

```js
const message = format('Hello <name>!', { name: 'World' });
// -> Hello World!
```
