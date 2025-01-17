import test from './library/ava-vitest'
import { debounce, sleep } from '../src/index'

test(
  'sleep()',
  async t => {
    return new Promise(
      resolve => {
        let n = 0
        sleep(100).then( () => { t.is(n, 0); n++ } )
        sleep(200).then( () => { t.is(n, 1); n++ } )
        sleep(300).then( () => { t.is(n, 2); n++ } )
        sleep(400).then( () => { t.is(n, 3); n++ } )
        sleep(500).then( a => resolve(a as void) )
      }
    )
  }
)
test(
  'debounce()',
  async t => {
    return new Promise(
      resolve => {
        let n = 0
        const f = debounce(
          () => {
            t.is(n, 20)
            n += 100
          },
          500
        )
        // call the debounced function at t=0
        f()
        // and again at t=100
        sleep(100).then(f)
        // set n to 10 at t=200
        sleep(200).then( () => n += 10 )
        // call debounced function again at t=300
        sleep(300).then(f)
        // set n to 20 at t=400
        sleep(400).then( () => n += 10 )
        // function should be called at t=800 (t=300 + 500ms delay)
        // then n should be 120 at t=900
        sleep(900).then( () => t.is(n, 120) )
        // resolve the promise and end the test at t=1000
        sleep(1000).then( a => resolve(a as void) )
      }
    )
  }
)
