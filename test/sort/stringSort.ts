import test from '../library/ava-vitest'
import { stringSort } from '../../src/index'


test(
  'stringSort()',
  t => {
    const sortByName = stringSort('name')
    const constants = [
      { name: 'pi',   value: 3.14  },
      { name: 'e',    value: 2.718 },
      { name: 'phi',  value: 1.618 },
    ]
    const sorted = constants.sort(sortByName)
    t.deepEqual(
      sorted,
      [
        { name: 'e',    value: 2.718 },
        { name: 'phi',  value: 1.618 },
        { name: 'pi',   value: 3.14  },
      ]
    )
  }
)

test(
  'stringSort() with nested data and function',
  t => {
    // @ts-expect-error - CBA to define data type
    const sortByName = stringSort( row => row.greek.letter )
    const constants = [
      { greek: { letter: 'pi'  }, value: 3.14  },
      { greek: { letter: 'e'   }, value: 2.718 },
      { greek: { letter: 'phi' }, value: 1.618 },
    ]
    const sorted = constants.sort(sortByName)
    t.deepEqual(
      sorted,
      [
        { greek: { letter: 'e'   }, value: 2.718 },
        { greek: { letter: 'phi' }, value: 1.618 },
        { greek: { letter: 'pi'  }, value: 3.14  },
      ]
    )
  }
)

