import test from './library/ava-vitest.js'
import { fail, failMsg, rethrow } from '../src/index'

test( 'fail()',
  t => t.throws(
    () => fail(
      'The ', 'cat', ' sat on the ', 'mat'
    ),
    {
      message: 'The cat sat on the mat'
    }
  )
)

test( 'failMsg()',
  t => t.throws(
    () => failMsg(
      'The <animal> sat on the <place>',
      { animal: 'dog', place: 'log' }
    ),
    {
      message: 'The dog sat on the log'
    }
  )
)

test( 'rethrow()',
  t => t.throws(
    () => {
      try {
        fail('This failed')
      }
      catch (e) {
        rethrow(e)
      }
    },
    {
      message: 'This failed'
    }
  )
)
