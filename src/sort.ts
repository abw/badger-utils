import { fail } from './error'
import { splitList } from './text'
import { StringIndexedObject } from './object'
import { isFunction, isInteger, isNumber, isString } from './assert'

export type ObjectSortFunction = (a: StringIndexedObject, b: StringIndexedObject) => number
export type FieldSelectFunction = (obj: StringIndexedObject) => unknown
export type FieldSelector = string | FieldSelectFunction
export type SortSelector = string | ObjectSortFunction
export type FieldSortFunction = (field: FieldSelector) => ObjectSortFunction
export type FieldSortOrderFunction = (fn: ObjectSortFunction) => ObjectSortFunction

/**
 * Function to extract a field from an object.
 * @param {Object} obj - object containing data
 * @param {string|Function} field - field to return
 * @return {unknown} - value from object
 * @example
 * booleanField({ a: 1 }, "a");     // true
 */
export const getField = (
  obj: StringIndexedObject,
  field: FieldSelector
): unknown =>
  isFunction(field)
    ? (field as FieldSelectFunction)(obj)
    : obj[field as string]


/**
 * Function to extract a boolean field from an object.
 * @param {Object} obj - object containing data
 * @param {string|Function} field - field to return as boolean
 * @return {boolean} - Boolean value from object
 * @example
 * booleanField({ a: 1 }, "a");     // true
 */
export const booleanField = (
  obj: StringIndexedObject,
  field: FieldSelector
): boolean =>
  Boolean(getField(obj, field)||0)


/**
 * Function to extract an integer field from an object.  Uses `parseInt()` to
 * coerce non-integer values (e.g. numbers in strings) to an integer.
 * @param {Object} obj - object containing data
 * @param {string|Function} field - field to return as integer
 * @return {number} - integer value from object
 * @example
 * integerField({ a: "10" }, "a");     // 10
 */
export const integerField = (
  obj: StringIndexedObject,
  field: FieldSelector
): number => {
  const value = getField(obj, field)
  return isInteger(value)
    ? value
    : isString(value)
      ? parseInt(value) || 0
      : 0
}

/**
 * Function to extract a number field from an object.  Uses `parseFloat()` to
 * coerce non-number values (e.g. numbers in strings) to floats.
 * @param {Object} obj - object containing data
 * @param {string|Function} field - field to return as float
 * @return {number} - floating point number from object
 * @example
 * numberField({ pi: "3.14" }, "pi");     // 3.14
 */
export const numberField = (
  obj: StringIndexedObject,
  field: FieldSelector
): number => {
  const value = getField(obj, field)
  return isNumber(value)
    ? value
    : isString(value)
      ? parseFloat(value) || 0
      : 0
}

/**
 * Function to extract a string field from an object.  Uses `toString()` to
 * coerce non-string values (e.g. numbers) to strings.
 * @param {Object} obj - object containing data
 * @param {string|Function} field - field to return as string
 * @return {number} - string value from object
 * @example
 * numberField({ pi: 3.14 }, "pi");     // "3.14"
 */
export const stringField = (
  obj: StringIndexedObject,
  field: FieldSelector
): string =>
  (getField(obj, field)||'').toString()

/**
 * Sort function generator for sorting objects by an integer field.
 * Takes a single field name and returns a sort function which will sort
 * objects by that field.
 * @param {string|Function} field - field to return as string
 * @return {Function} - sort function to sort objects by the named integer field
 * @example
 * const people = [
 *   { name: "Fred",   age: 18 },
 *   { name: "Shaggy", age: 17 },
 *   { name: "Daphne", age: 16 },
 *   { name: "Velma",  age: 15 },
 * ];
 * const sortByAge = integerSort('age');
 * const sorted = people.sort(sortByAge); // Velma, Daphne, Shaggy, Fred
 */
export const integerSort = (field: FieldSelector): ObjectSortFunction =>
  (a, b): number =>
    integerField(a, field) - integerField(b, field)

/**
 * Sort function generator for sorting objects by a number field.
 * Takes a single field name and returns a sort function which will sort
 * objects by that field.
 * @param {string|Function} field - field to return as string
 * @return {Function} - sort function to sort objects by the named number field
 * @example
 * const constants = [
 *   { name: "pi",   value: 3.14  },
 *   { name: "e",    value: 2.718 },
 *   { name: "phi",  value: 1.618 },
 * ];
 * const sortByValue = numberSort('value');
 * const sorted = constants.sort(sortByValue); // phi, e, pi
 */
export const numberSort = (field: FieldSelector): ObjectSortFunction =>
  (a, b): number => numberField(a, field) - numberField(b, field)

/**
 * Sort function generator for sorting objects by a string field.
 * Takes a single field name and returns a sort function which will sort
 * objects by that field.
 * @param {string|Function} field - field to return as string
 * @return {Function} - sort function to sort objects by the named string field
 * @example
 * const constants = [
 *   { name: "pi",   value: 3.14  },
 *   { name: "e",    value: 2.718 },
 *   { name: "phi",  value: 1.618 },
 * ];
 * const sortByName = stringSort('name');
 * const sorted = constants.sort(sortByName); // e, phi, pi
 */
export const stringSort = (field: FieldSelector): ObjectSortFunction =>
  (a, b) => {
    const c = stringField(a, field).toLowerCase()
    const d = stringField(b, field).toLowerCase()
    return c > d ? 1 : d > c ? -1 : 0
  }

/**
 * Sort function generator for sorting objects by a boolean field.
 * Takes a single field name and returns a sort function which will sort
 * objects by that field.
 * @param {string|Function} field - field to return as string
 * @return {Function} - sort function to sort objects by the named boolean field
 * @example
 * const words = [
 *   { name: "no",   truth: false  },
 *   { name: "yes",  truth: 1 },
 * ];
 * const sortByBool = booleanSort('truth');
 * const sorted = words.sort(sortByBool); // yes, no
 */
export const booleanSort = (field: FieldSelector): ObjectSortFunction =>
  (a, b) => {
    const c = booleanField(a, field)
    const d = booleanField(b, field)
    return (c === d) ? 0 : c ? 1 : -1
  }

/**
 * Lookup table mapping sort types to their functions.
 */
export const sortTypes: Record<string, FieldSortFunction> = {
  num:      numberSort,
  int:      integerSort,
  str:      stringSort,
  bool:     booleanSort,
  number:   numberSort,
  integer:  integerSort,
  string:   stringSort,
  boolean:  booleanSort,
}

/**
 * Do-nothing function provided for completeness.  It expects to be passed a sort
 * function that, by default, sorts in ascending order and it simply returns that
 * function unmodified.
 * @param {Function} fn - sort function
 * @return {Function} - the same sort function
 * @example
 * const sortByName = stringSort('name');
 * const sortByNameAsc = ascendingOrder(sortByName);
 */
export const ascendingOrder = (fn: ObjectSortFunction): ObjectSortFunction => fn

/**
 * Inverting function that converts a sort function that sorts in ascending order to
 * one that sorts in descending order.  It does this by swapping the `a` and `b`
 * arguments passed to the function.
 * @param {Function} fn - function to sort in ascending order
 * @return {Function} - wrapper around the function to sort in descending order
 * @example
 * const sortByName = stringSort('name');
 * const sortByNameDesc = descendingOrder(sortByName);
 */
export const descendingOrder = (fn: ObjectSortFunction): ObjectSortFunction =>
  (a, b) => fn(b, a)

/**
 * Lookup table mapping sort orders to their functions.
 */
export const sortOrders: Record<string, FieldSortOrderFunction> = {
  asc:        ascendingOrder,
  desc:       descendingOrder,
  ascending:  ascendingOrder,
  descending: descendingOrder,
}


/**
 * Sort function generator for sorting objects by multiple fields.
 * The specification can be either an array of sort functions, or be
 * specification used to construct those functions.  The specification
 * should be a whitespace delimited string in which each
 * component is the field name, optional data type and optional sort order,
 * each separated by a colon.
 * In the simple case, the data type is assumed be be `string` and the sort
 * order defaults to `asc`.  e.g. `surname forename` is the short form of
 * `surname:string:asc forename:string:asc`.  The data type can be one of
 * `string` (default), `integer` or `number` and the sort order can be `asc`
 * (default) for ascending order or `desc` for descending.
 * Returns a function which sorts an array of object by those fields.
 * @param {string} spec - sort specification
 * @return {Function} - sort function to sort objects by the named string field
 * @example
 * const people = [
 *   { forename: "John", surname: "Smith", age: 28 },
 *   { forename: "Jack", surname: "Smith", age: 30 },
 *   { forename: "John", surname: "Smith", age: 25 },
 *   { forename: "John", surname: "Jones", age: 32 },
 * ];
 * const sortByNameAndAge = multiSort('surname forename age:integer:desc');
 * const sorted = people.sort(sortByNameAndAge); // John Jones 32, Jack Smith 30, John Smith 28, John Smith 25
 */
export const multiSort = (spec: string | SortSelector[]): ObjectSortFunction => {
  const sorts = splitList(spec)
  const funcs = sorts.map(
    sort => {
      if (isFunction(sort)) {
        return sort
      }
      else if (isString(sort)) {
        const match = sort.match(/^(\w+)(?::(\w+))?(?::(\w+))?$/)
          || fail(`Invalid sort field: ${sort}`)
        const sorter = sortTypes[match[2] || 'string']
          || fail(`Invalid sort type "${match[2]}" in sort field: ${sort}`)
        const order = sortOrders[match[3] || 'asc']
          || fail(`Invalid sort order "${match[3]}" in sort field: ${sort}`)
        return order(sorter(match[1]))
      }
      else {
        fail(`Invalid sort field: ${sort}`)
      }
    }
  )
  return (a, b) => {
    for (let i = 0; i < funcs.length; i++) {
      const sortFunc = funcs[i]
      const cmp = sortFunc(a, b) as number
      if (cmp !== 0) {
        return cmp
      }
    }
    return 0
  }
}