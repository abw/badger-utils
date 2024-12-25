import { commas } from './numbers'
import { isString, isArray, noValue, isObject, isFunction, hasValue } from './assert'

export type ListSource = null | undefined | string | number | any[]
export type HashSource = object | ListSource


/**
 * Split a comma/whitespace delimited string into an Array
 * @param {string} value - string to split
 * @param {RegExp} [regex] - optional pattern to split on
 * @return {Array} array of split strings
 * @example
 * const strings = splitList('one two three')
 * @example
 * const strings = splitList('one,two,three')
 * @example
 * const strings = splitList('one, two, three')
 */
export function splitList(
  value: ListSource,
  regex: RegExp=/,\s*|\s+/
): any[] {
  if (noValue(value)) {
    return [ ]
  }
  else if (isString(value)) {
    return (value as string).length
      ? (value as string).split(regex)
      : [ ]
  }
  else if (isArray(value)) {
    return value as any[]
  }
  return [value]
}


/**
 * Split a comma/whitespace delimited string or Array into a hash object
 * @param {string} value - string to split
 * @param {boolean|string|number|Function} [set=true] - value to set for each key
 * @param {Object} [hash={}] - object to set keys in
 * @return {Object} hash object mapping keys to values
 * @example
 * const items = splitHash('one two')  // { one: true, two: true }
 * @example
 * const items = splitList('one two', 1)  // { one: 1, two: 1 }
 * @example
 * const items = splitList('one two', i => i)  // { one: 'one', two: 'two' }
 */
export function splitHash(
  value: HashSource,
  set: any=true,
  hash: object={ }
): object {
  // if it's already a hash object then return it unchanged
  if (isObject(value)) {
    return value as object
  }
  // split a string into an array (or leave an array unchanged)
  const items = splitList(value as string)

  return items.reduce(
    (result, key) => {
      result[key] = isFunction(set)
        ? set(key)
        : set
      return result
    },
    hash
  )
}

/**
 * Split a string into an Array of lines.
 * @param {string} text - string to split
 * @return {Array} array of lines
*/
export function splitLines(text: ListSource): string[] {
  if (! isString(text) || (text as string).length === 0) {
    return [ ]
  }
  var lines = (text as string).split(/\s*\n+\s*/).filter(
    function(item) { return item.length > 0 }
  )
  return lines
}

/**
 * Join an Array into a single string
 * @param {Array} array - array to join
 * @param {string} [joint=' '] - delimiter to join strings
 * @param {string} [lastJoint=joint] - delimiter for final item
 * @return {string} joined string
 * @example
 * joinList(['one', 'two', 'three']);   // one two three
 * @example
 * joinList(['one', 'two', 'three'], ', ');   // one, two, three
 * @example
 * joinList(['one', 'two', 'three'], ', ', ' and ');   // one, two and three
 */
export function joinList(
  array: any[],
  joint: string=' ',
  lastJoint: string=joint
): string {
  let copy = [...array]
  const last = copy.pop()
  return copy.length
    ? [copy.join(joint), last].join(lastJoint)
    : last
}

/**
 * Join an Array into a single string using commas for delimiters and ` and ` for the final item
 * @param {Array} array - array to join
 * @param {string} [joint=', '] - delimiter to join strings
 * @param {string} [lastJoint=' and '] - delimiter for final item
 * @return {string} joined string
 * @example
 * joinListAnd(['one', 'two', 'three']);   // one, two and three
 */
export function joinListAnd(
  array: any[],
  joint: string=', ',
  lastJoint: string=' and '
): string {
  return joinList(array, joint, lastJoint)
}

/**
 * Join an Array into a single string using commas for delimiters and ` or ` for the final item
 * @param {Array} array - array to join
 * @param {string} [joint=', '] - delimiter to join strings
 * @param {string} [lastJoint=' or '] - delimiter for final item
 * @return {string} joined string
 * @example
 * joinListOr(['one', 'two', 'three']);   // one, two or three
 */
export function joinListOr(
  array: any[],
  joint: string=', ',
  lastJoint: string=' or '
): string {
  return joinList(array, joint, lastJoint)
}

/**
 * Capitalise a string by converting the first character to upper case and other characters to lower case
 * @param {string} word - word to capitalise
 * @return {string} capitalised string
 * @example
 * capitalise('badger');   // Badger
 * @example
 * capitalise('BADGER');   // Badger
 */
export function capitalise(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

/**
 * Capitalise all words in a string by converting the first character of each word to upper case
 * @param {string} string - words to capitalise
 * @return {string} capitalised string
 * @example
 * capitaliseWords('badger fun');   // Badger Fun
 * @example
 * capitaliseWords('BADGER FUN');   // Badger Fun
 */
export function capitaliseWords(string: string): string {
  return string.replace(
    // /(?:^|\s)\S/g,
    /(\w+)/g,
    capitalise
  )
}

/**
 * Convert a snake case string to studly caps
 * @param {string} snake - word to capitalise
 * @return {string} capitalised string
 * @example
 * snakeToStudly('happy_badger_dance');   // HappyBadgerDance
 * @example
 * snakeToStudly('happy_badger/dance');   // HappyBadger/Dance
 */
export function snakeToStudly(snake: string): string {
  return snake.split('/').map(
    // each segment can be like foo_bar which we convert to FooBar
    segment => segment.split('_').map(capitalise).join('')
  ).join('/')
}

/**
 * Convert a snake case string to camel case
 * @param {string} snake - word to capitalise
 * @return {string} capitalised string
 * @example
 * snakeToCamel('happy_badger_dance');   // happyBadgerDance
 * @example
 * snakeToCamel('happy_badger/dance');   // happyBadger/dance
 */
export function snakeToCamel(snake: string): string {
  return snake.split('/').map(
    // each segment can be like foo_bar which we convert to fooBar
    segment => segment.split('_').map((i, n) => n ? capitalise(i) : i).join('')
  ).join('/')
}

/**
 * A very primitive function to pluralise the singular form of a words.  It only
 * works on words with standard endings and plural forms, because pluralising
 * words is notoriously difficult.
 * @param {string} singular - word to pluralise
 * @param {Object} [specialCases={}] - special cases
 * @return {string} plural form
 * @example
 * plural('box');     // boxes
 * @example
 * plural('doggy');   // doggies
 * @example
 * plural('badger');  // badgers
 * @example
 * plural('woman');   // womans
 */
export function plural(
  singular: string,
  specialCases: object={}
): string {
  const special = specialCases[singular as keyof object]
  if (hasValue(special)) {
    return special as string
  }
  let found: RegExpMatchArray | null

  if (singular.match(/(ss?|sh|ch|x)$/)) {
    // e.g. grass/grasses, lash/lashes, watch/watches, box, boxes
    return singular + 'es'
  }
  else if ((found = singular.match(/(.*?[^aeiou])y$/))) {
    // doggy/doggies
    return found[1] + 'ies'
  }
  else if (singular.match(/([^s\d\W])$/)) {
    // cat/cats
    return singular + 's'
  }
  return singular
}

/**
 * A very primitive function to return the singular form of a plural noun.  It
 * only works on words with standard endings and plural forms that, using the
 * reverse algorithm of {@link plural()}.
 * @param {string} plural - plural form
 * @param {Object} [specialCases={}] - special cases
 * @return {string} singular form
 * @example
 * singular('boxes');     // box
 * @example
 * singular('doggies');   // doggy
 * @example
 * singular('badgers');   // badger
 * @example
 * singular('women');     // women - FAIL!
 */
export function singular(
  plural: string,
  specialCases: object = {}
): string {
  const special = specialCases[plural as keyof object]
  if (hasValue(special)) {
    return special
  }

  if (plural.match(/(ss|sh|ch|x)es$/)) {
    return plural.replace(/es$/, '')
  }
  else if (plural.match(/([^aeiou])ies$/)) {
    return plural.replace(/ies$/, 'y')
  }
  else if (plural.match(/([^s\d\W])s$/)) {
    return plural.replace(/s$/, '')
  }
  return plural
}

/**
 * Utility function to inflect a string passed as the second argument to the singular/plural
 * form based on the number passed as the first argument.  Uses the {@link plural()} function
 * which only works on words with standard pluralisations.  The third argument can be provided
 * as the plural form where necessary.  The optional 4th argument can be used to provide a different
 * word for the case where n is 0.  The default is "no", e.g. "no badgers" when n is 0.
 * @param {number} n - number of items
 * @param {string} singularForm - singular form
 * @param {string} [pluralForm] - optional plural form
 * @param {string} [no='no'] - optional word to use when `n` is 0
 * @example
 * inflect(0, 'cat')     // no cats
 * @example
 * inflect(1, 'cat')     // 1 cat
 * @example
 * inflect(2, 'cat')     // 2 cats
 * @example
 * inflect(0, 'child', 'children')     // no children
 * @example
 * inflect(1, 'child', 'children')     // 1 child
 * @example
 * inflect(2, 'child', 'children')     // 2 children
 * @example
 * inflect(0, 'black', 'black', 'none, none more')     // none, none more black
 */
export function inflect(
  n: number,
  singularForm: string,
  pluralForm?: string,
  no: string = 'no'
): string {
  return (n ? commas(n) : no)
    + ' '
    + (n === 1 ? singularForm : (pluralForm || plural(singularForm)))
}

/**
 * Wrapper around {@link inflect()} which uses the word "No" instead of "no" for the
 * zero case, i.e. Inflect() is the capitalized form of inflect()
 * @param {number} n - number of items
 * @param {string} singular - singular form
 * @param {string} [plural] - optional plural form
 * @param {string} [no='No'] - optional word to use when `n` is 0
 */
export function Inflect(
  n: number,
  singular: string,
  plural?: string,
  no: string = 'No'
) {
  return inflect(n, singular, plural, no)
}



// for the yanks
export const capitalize = capitalise
export const capitalizeWords = capitaliseWords
export const pluralise = plural
export const pluralize = plural

