# Badger Utils

This is a collection of various useful Javascript utility functions that I've
written over the years.

Many of them are wrappers for simple code snippets that exist only to make
my code more self-documenting and/or easier to read.  Some are more
complicated and are the kind of things that I prefer not to copy-and-paste
into different projects.

You'll find similar functions in other libraries like
[underscore](https://underscorejs.org/) and [Lodash](https://lodash.com/).
These just happen to be the ones I tend to use all the time.

## Installation

Install `badger-utils` using your favourite package manager.

### npm

    npm add @abw/badger-utils

### pnpm

    pnpm add @abw/badger-utils

### yarn

    yarn add @abw/badger-utils

## Documentation

Visit the [website](https://abw.github.io/badger-utils/) for detailed
documentation.

## Assertions

* [isBoolean(value)](https://abw.github.io/badger-utils/assertions#isBoolean)
* [isString(value)](https://abw.github.io/badger-utils/assertions#isString)
* [isNumber(value)](https://abw.github.io/badger-utils/assertions#isNumber)
* [isInteger(value)](https://abw.github.io/badger-utils/assertions#isInteger)
* [isFloat(value)](https://abw.github.io/badger-utils/assertions#isFloat)
* [isArray(value)](https://abw.github.io/badger-utils/assertions#isArray)
* [isFunction(value)](https://abw.github.io/badger-utils/assertions#isFunction)
* [isRegExp(value)](https://abw.github.io/badger-utils/assertions#isRegExp)
* [isObject(value)](https://abw.github.io/badger-utils/assertions#isObject)
* [isUndefined(value)](https://abw.github.io/badger-utils/assertions#isUndefined)
* [isNull(value)](https://abw.github.io/badger-utils/assertions#isNull)
* [hasValue(value)](https://abw.github.io/badger-utils/assertions#hasValue)
* [noValue(value)](https://abw.github.io/badger-utils/assertions#noValue)
* [haveValue(...values)](https://abw.github.io/badger-utils/assertions#haveValue)
* [firstValue(...values)](https://abw.github.io/badger-utils/assertions#firstValue)

## Numbers

* [range(from, to, step=1)](https://abw.github.io/badger-utils/numbers#range)
* [formatNumber(number, options)](https://abw.github.io/badger-utils/numbers#formatNumber)
* [currency(number, options)](https://abw.github.io/badger-utils/numbers#currency)
* [commas(n)](https://abw.github.io/badger-utils/numbers#commas)
* [setNumberDefaults(defaults)](https://abw.github.io/badger-utils/numbers#setNumberDefaults)

## Text

* [splitLines(text)](https://abw.github.io/badger-utils/text#splitLines)
* [splitList(value)](https://abw.github.io/badger-utils/text#splitList)
* [splitHash(value, set=true, hash={})](https://abw.github.io/badger-utils/text#splitHash)
* [joinList(array, joint=' ', lastJoint=joint)](https://abw.github.io/badger-utils/text#joinList)
* [joinListAnd(array, joint=', ', lastJoint=' and ')](https://abw.github.io/badger-utils/text#joinListAnd)
* [joinListOr(array, joint=', ', lastJoint=' or ')](https://abw.github.io/badger-utils/text#joinListOr)
* [capitalise(word) / capitalize(word)](https://abw.github.io/badger-utils/text#capitalise)
* [capitaliseWords(string) / capitalizeWords(string)](https://abw.github.io/badger-utils/text#capitaliseWords)
* [snakeToStudly(snake)](https://abw.github.io/badger-utils/text#snakeToStudly)
* [snakeToCamel(snake)](https://abw.github.io/badger-utils/text#snakeToCamel)
* [plural(singular)](https://abw.github.io/badger-utils/text#plural)
* [singular(plural)](https://abw.github.io/badger-utils/text#singular)
* [inflect(n, singular, plural, no='no')](https://abw.github.io/badger-utils/text#inflect)
* [Inflect(n, singular, plural, no='No')](https://abw.github.io/badger-utils/text#Inflect)
* [format(message, data)](https://abw.github.io/badger-utils/text#format)

## Objects

* [hash(source, options)](https://abw.github.io/badger-utils/objects#hash)
* [objMap(obj, fn)](https://abw.github.io/badger-utils/objects#objMap)
* [remove(object, key)](https://abw.github.io/badger-utils/objects#remove)
* [extract(object, keys, options)](https://abw.github.io/badger-utils/objects#extract)
* [keys(object)](https://abw.github.io/badger-utils/objects#keys)
* [values(object)](https://abw.github.io/badger-utils/objects#values)
* [entries(object)](https://abw.github.io/badger-utils/objects#entries)

## Select

* [selector(spec)](https://abw.github.io/badger-utils/select#selector)

## Sort

* [stringSort(field)](https://abw.github.io/badger-utils/sort#stringSort)
* [numberSort(field)](https://abw.github.io/badger-utils/sort#numberSort)
* [integerSort(field)](https://abw.github.io/badger-utils/sort#integerSort)
* [multiSort(fields)](https://abw.github.io/badger-utils/sort#multiSort)
* [stringField(obj,field)](https://abw.github.io/badger-utils/sort#stringField)
* [numberField(obj,field)](https://abw.github.io/badger-utils/sort#numberField)
* [integerField(obj,field)](https://abw.github.io/badger-utils/sort#integerField)
* [descendingOrder(sortFn)](https://abw.github.io/badger-utils/sort#descendingOrder)
* [ascendingOrder(sortFn)](https://abw.github.io/badger-utils/sort#ascendingOrder)

## Timing

* [debounce(func, timeout=300)](https://abw.github.io/badger-utils/timing#debounce)
* [sleep(ms)](https://abw.github.io/badger-utils/timing#sleep)

## Errors

* [fail(message)](https://abw.github.io/badger-utils/errors#fail)
* [failMsg(message, data)](https://abw.github.io/badger-utils/errors#failMsg)
* [rethrow(error)](https://abw.github.io/badger-utils/errors#rethrow)

## Miscellaneous

* [doNothing()](https://abw.github.io/badger-utils/misc#doNothing)
* [defaultLocale()](https://abw.github.io/badger-utils/misc#defaultLocale)

## Author

Andy Wardley <abw@wardley.org>