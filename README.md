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

Visit the [website](https://badgerpower.com/badger-utils/) for detailed
documentation.

## Assertions

* [isBoolean(value)](https://badgerpower.com/badger-utils/assertions#isBoolean)
* [isString(value)](https://badgerpower.com/badger-utils/assertions#isString)
* [isNumber(value)](https://badgerpower.com/badger-utils/assertions#isNumber)
* [isInteger(value)](https://badgerpower.com/badger-utils/assertions#isInteger)
* [isFloat(value)](https://badgerpower.com/badger-utils/assertions#isFloat)
* [isArray(value)](https://badgerpower.com/badger-utils/assertions#isArray)
* [isFunction(value)](https://badgerpower.com/badger-utils/assertions#isFunction)
* [isRegExp(value)](https://badgerpower.com/badger-utils/assertions#isRegExp)
* [isObject(value)](https://badgerpower.com/badger-utils/assertions#isObject)
* [isSimple(value)](https://badgerpower.com/badger-utils/assertions#isSimple)
* [isUndefined(value)](https://badgerpower.com/badger-utils/assertions#isUndefined)
* [isNull(value)](https://badgerpower.com/badger-utils/assertions#isNull)
* [isEmpty(...values)](https://badgerpower.com/badger-utils/assertions#isEmpty)
* [hasValue(value)](https://badgerpower.com/badger-utils/assertions#hasValue)
* [noValue(value)](https://badgerpower.com/badger-utils/assertions#noValue)
* [haveValue(...values)](https://badgerpower.com/badger-utils/assertions#haveValue)
* [firstValue(...values)](https://badgerpower.com/badger-utils/assertions#firstValue)

## Numbers

* [range(from, to, step=1)](https://badgerpower.com/badger-utils/numbers#range)
* [formatNumber(number, options)](https://badgerpower.com/badger-utils/numbers#formatNumber)
* [currency(number, options)](https://badgerpower.com/badger-utils/numbers#currency)
* [commas(n)](https://badgerpower.com/badger-utils/numbers#commas)
* [setNumberDefaults(defaults)](https://badgerpower.com/badger-utils/numbers#setNumberDefaults)

## Text

* [splitLines(text)](https://badgerpower.com/badger-utils/text#splitLines)
* [splitList(value)](https://badgerpower.com/badger-utils/text#splitList)
* [splitHash(value, set=true, hash={})](https://badgerpower.com/badger-utils/text#splitHash)
* [joinList(array, joint=' ', lastJoint=joint)](https://badgerpower.com/badger-utils/text#joinList)
* [joinListAnd(array, joint=', ', lastJoint=' and ')](https://badgerpower.com/badger-utils/text#joinListAnd)
* [joinListOr(array, joint=', ', lastJoint=' or ')](https://badgerpower.com/badger-utils/text#joinListOr)
* [capitalise(word) / capitalize(word)](https://badgerpower.com/badger-utils/text#capitalise)
* [capitaliseWords(string) / capitalizeWords(string)](https://badgerpower.com/badger-utils/text#capitaliseWords)
* [snakeToStudly(snake)](https://badgerpower.com/badger-utils/text#snakeToStudly)
* [snakeToCamel(snake)](https://badgerpower.com/badger-utils/text#snakeToCamel)
* [plural(singular)](https://badgerpower.com/badger-utils/text#plural)
* [singular(plural)](https://badgerpower.com/badger-utils/text#singular)
* [inflect(n, singular, plural, no='no')](https://badgerpower.com/badger-utils/text#inflect)
* [Inflect(n, singular, plural, no='No')](https://badgerpower.com/badger-utils/text#Inflect)
* [format(message, data)](https://badgerpower.com/badger-utils/text#format)

## Objects

* [hash(source, options)](https://badgerpower.com/badger-utils/objects#hash)
* [objMap(obj, fn)](https://badgerpower.com/badger-utils/objects#objMap)
* [remove(object, key)](https://badgerpower.com/badger-utils/objects#remove)
* [extract(object, keys, options)](https://badgerpower.com/badger-utils/objects#extract)
* [keys(object)](https://badgerpower.com/badger-utils/objects#keys)
* [values(object)](https://badgerpower.com/badger-utils/objects#values)
* [entries(object)](https://badgerpower.com/badger-utils/objects#entries)

## Functions

* [maybeFunction(fn, args)](https://badgerpower.com/badger-utils/functions#maybeFunction)
* [doNothing()](https://badgerpower.com/badger-utils/functions#doNothing)
* [identity(value)](https://badgerpower.com/badger-utils/functions#identity)

## Select

* [selector(spec)](https://badgerpower.com/badger-utils/select#selector)

## Sort

* [stringSort(field)](https://badgerpower.com/badger-utils/sort#stringSort)
* [numberSort(field)](https://badgerpower.com/badger-utils/sort#numberSort)
* [integerSort(field)](https://badgerpower.com/badger-utils/sort#integerSort)
* [booleanSort(field)](https://badgerpower.com/badger-utils/sort#booleanSort)
* [multiSort(fields)](https://badgerpower.com/badger-utils/sort#multiSort)
* [stringField(obj,field)](https://badgerpower.com/badger-utils/sort#stringField)
* [numberField(obj,field)](https://badgerpower.com/badger-utils/sort#numberField)
* [integerField(obj,field)](https://badgerpower.com/badger-utils/sort#integerField)
* [booleanField(obj,field)](https://badgerpower.com/badger-utils/sort#booleanField)
* [descendingOrder(sortFn)](https://badgerpower.com/badger-utils/sort#descendingOrder)
* [ascendingOrder(sortFn)](https://badgerpower.com/badger-utils/sort#ascendingOrder)

## Timing

* [debounce(func, timeout=300)](https://badgerpower.com/badger-utils/timing#debounce)
* [sleep(ms)](https://badgerpower.com/badger-utils/timing#sleep)

## Errors

* [fail(message)](https://badgerpower.com/badger-utils/errors#fail)
* [failMsg(message, data)](https://badgerpower.com/badger-utils/errors#failMsg)
* [rethrow(error)](https://badgerpower.com/badger-utils/errors#rethrow)

## Miscellaneous

* [defaultLocale()](https://badgerpower.com/badger-utils/misc#defaultLocale)

## Author

Andy Wardley <abw@wardley.org>