import test from './library/ava-vitest'
import { selector } from '../src/index'

//----------------------------------------------------------------------------
// selector()
//----------------------------------------------------------------------------
test(
  'selector(function)',
  t => {
    const select = selector( a => a === 'foo')
    t.true( select('foo') )
    t.false( select('bar') )
  }
)
test(
  'selector(object)',
  t => {
    const select = selector({ foo: true })
    t.true( select('foo') )
    t.false( select('bar') )
  }
)
test(
  'selector(RegExp)',
  t => {
    const select = selector(/foo/)
    t.true( select('foo') )
    t.true( select('food') )
    t.false( select('bar') )
  }
)
test(
  'selector(array)',
  t => {
    const select = selector(['foo'])
    t.true( select('foo') )
    t.false( select('bar') )
  }
)
test(
  'selector(string)',
  t => {
    const select = selector('foo food')
    t.true( select('foo') )
    t.true( select('food') )
    t.false( select('bar') )
  }
)
test(
  'selector(null)',
  t => t.throws(
    // @ts-expect-error - null is an invalid argument
    () => selector(null),
    {
      message: 'Invalid selector() specification: null'
    }
  )
)
