import test from 'ava';
import { fail, failMsg } from '../src/utils/error.js';

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
