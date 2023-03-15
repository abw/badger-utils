# Badger Utils

This is a collection of various useful utility functions that I've written
over the years.

Many of them are wrappers for simple code snippets that exist only to make
my code more self-documenting and/or easier to read.  Some are more
complicated and are the kind of things that I prefer not to copy-and-paste
into different projects.  You'll find similar functions in other libraries
like [underscore](https://underscorejs.org/) and [Lodash](https://lodash.com/).
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

Read the [manual](https://abw.github.io/badger-utils/docs/manual/index.html)
for an overview of the function and examples of use, or the
[API documentation](https://abw.github.io/badger-utils/docs/) if you just want
the nitty-gritty.

## Assertions

* [isBoolean(value)](https://abw.github.io/badger-utils/docs/manual/assertions.html#isboolean-value-)
* [isString(value)](https://abw.github.io/badger-utils/docs/manual/assertions.html#isstring-value-)
* [isNumber(value)](https://abw.github.io/badger-utils/docs/manual/assertions.html#isnumber-value-)
* [isInteger(value)](https://abw.github.io/badger-utils/docs/manual/assertions.html#isinteger-value-)
* [isFloat(value)](https://abw.github.io/badger-utils/docs/manual/assertions.html#isfloat-value-)
* [isArray(value)](https://abw.github.io/badger-utils/docs/manual/assertions.html#isarray-value-)
* [isFunction(value)](https://abw.github.io/badger-utils/docs/manual/assertions.html#isfunction-value-)
* [isRegExp(value)](https://abw.github.io/badger-utils/docs/manual/assertions.html#isregexp-value-)
* [isObject(value)](https://abw.github.io/badger-utils/docs/manual/assertions.html#isobject-value-)
* [isUndefined(value)](https://abw.github.io/badger-utils/docs/manual/assertions.html#isundefined-value-)
* [isNull(value)](https://abw.github.io/badger-utils/docs/manual/assertions.html#isnull-value-)
* [hasValue(value)](https://abw.github.io/badger-utils/docs/manual/assertions.html#hasvalue-value-)
* [noValue(value)](https://abw.github.io/badger-utils/docs/manual/assertions.html#novalue-value-)
* [haveValue(...values)](https://abw.github.io/badger-utils/docs/manual/assertions.html#havevalue----values-)
* [firstValue(...values)](https://abw.github.io/badger-utils/docs/manual/assertions.html#firstvalue----values-)

## Numbers

* [range(from, to, step=1)](https://abw.github.io/badger-utils/docs/manual/numbers.html#range-from--to--step-1-)
* [formatNumber(number, options)](https://abw.github.io/badger-utils/docs/manual/numbers.html#formatnumber-number--options-)
* [currency(number, options)](https://abw.github.io/badger-utils/docs/manual/numbers.html#currency-number--options-)
* [commas(n)](https://abw.github.io/badger-utils/docs/manual/numbers.html#commas-n-)
* [setNumberDefaults(defaults)](https://abw.github.io/badger-utils/docs/manual/numbers.html#setnumberdefaults-defaults-)

## Text

* [splitLines(text)](https://abw.github.io/badger-utils/docs/manual/text.html#splitlines-text-)
* [splitList(value)](https://abw.github.io/badger-utils/docs/manual/text.html#splitlist-value-)
* [splitHash(value, set=true, hash={})](https://abw.github.io/badger-utils/docs/manual/text.html#splithash-value--set-true--hash----)
* [joinList(array, joint=' ', lastJoint=joint)](https://abw.github.io/badger-utils/docs/manual/text.html#joinlist-array--joint---39----39---lastjoint-joint-)
* [joinListAnd(array, joint=', ', lastJoint=' and ')](https://abw.github.io/badger-utils/docs/manual/text.html#joinlistand-array--joint---39-----39---lastjoint---39--and---39--)
* [joinListOr(array, joint=', ', lastJoint=' or ')](https://abw.github.io/badger-utils/docs/manual/text.html#joinlistor-array--joint---39-----39---lastjoint---39--or---39--)
* [capitalise(word) / capitalize(word)](https://abw.github.io/badger-utils/docs/manual/text.html#capitalise-word----capitalize-word-)
* [capitaliseWords(string) / capitalizeWords(string)](https://abw.github.io/badger-utils/docs/manual/text.html#capitalisewords-string----capitalizewords-string-)
* [snakeToStudly(snake)](https://abw.github.io/badger-utils/docs/manual/text.html#snaketostudly-snake-)
* [snakeToCamel(snake)](https://abw.github.io/badger-utils/docs/manual/text.html#snaketocamel-snake-)
* [plural(singular)](https://abw.github.io/badger-utils/docs/manual/text.html#plural-singular-)
* [singular(plural)](https://abw.github.io/badger-utils/docs/manual/text.html#singular-plural-)
* [inflect(n, singular, plural, no='no')](https://abw.github.io/badger-utils/docs/manual/text.html#inflect-n--singular--plural--no---39-no--39--)
* [Inflect(n, singular, plural, no='No')](https://abw.github.io/badger-utils/docs/manual/text.html#inflect-n--singular--plural--no---39-no--39--)
* [format(message, data)](https://abw.github.io/badger-utils/docs/manual/text.html#format-message--data-)

## Objects

* [hash(source, options)](https://abw.github.io/badger-utils/docs/manual/objects.html#hash-source--options-)
* [objMap(obj, fn)](https://abw.github.io/badger-utils/docs/manual/objects.html#objmap-obj--fn-)
* [remove(object, key)](https://abw.github.io/badger-utils/docs/manual/objects.html#remove-object--key-)
* [extract(object, keys, options)](https://abw.github.io/badger-utils/docs/manual/objects.html#extract-object--keys--options-)
* [keys(object)](https://abw.github.io/badger-utils/docs/manual/objects.html#keys-object-)
* [values(object)](https://abw.github.io/badger-utils/docs/manual/objects.html#values-object-)
* [entries(object)](https://abw.github.io/badger-utils/docs/manual/objects.html#entries-object-)

## Select

* [selector(spec)](https://abw.github.io/badger-utils/docs/manual/select.html#selector-spec-)

## Sort

* [stringSort(field)](https://abw.github.io/badger-utils/docs/manual/sort.html#stringsort-field-)
* [numberSort(field)](https://abw.github.io/badger-utils/docs/manual/sort.html#numbersort-field-)
* [integerSort(field)](https://abw.github.io/badger-utils/docs/manual/sort.html#integersort-field-)
* [multiSort(fields)](https://abw.github.io/badger-utils/docs/manual/sort.html#multisort-fields-)
* [stringField(obj,field)](https://abw.github.io/badger-utils/docs/manual/sort.html#stringfield-obj-field-)
* [numberField(obj,field)](https://abw.github.io/badger-utils/docs/manual/sort.html#numberfield-obj-field-)
* [integerField(obj,field)](https://abw.github.io/badger-utils/docs/manual/sort.html#integerfield-obj-field-)
* [descendingOrder(sortFn)](https://abw.github.io/badger-utils/docs/manual/sort.html#descendingorder-sortfn-)
* [ascendingOrder(sortFn)](https://abw.github.io/badger-utils/docs/manual/sort.html#ascendingorder-sortfn-)

## Timing

* [debounce(func, timeout=300)](https://abw.github.io/badger-utils/docs/manual/timing.html#debounce-func--timeout-300-)
* [sleep(ms)](https://abw.github.io/badger-utils/docs/manual/timing.html#sleep-ms-)

## Errors

* [fail(message)](https://abw.github.io/badger-utils/docs/manual/errors.html#fail-message-)
* [failMsg(message, data)](https://abw.github.io/badger-utils/docs/manual/errors.html#failmsg-message--data-)
* [rethrow(error)](https://abw.github.io/badger-utils/docs/manual/errors.html#rethrow-error-)

## Miscellaneous

* [doNothing()](https://abw.github.io/badger-utils/docs/manual/misc.html#donothing--)
* [defaultLocale()](https://abw.github.io/badger-utils/docs/manual/misc.html#defaultlocale--)

## Author

Andy Wardley <abw@wardley.org>