import fc from 'fast-check'
import type { Arbitrary, Memo } from 'fast-check'

import { get } from '../utils/get'

const pathArrayArbitrary = fc.array(fc.lorem({ maxCount: 1 }), {
  minLength: 1,
  maxLength: 3,
})

const valueArbitrary = fc.anything()

function arrOfKeysArbitrary(): Arbitrary<string[]> {
  return fc.array(fc.lorem({ maxCount: 1 }), { minLength: 0, maxLength: 10 })
}

function recordWithKeyArbitrary(
  reqKey: string,
  reqVal: Arbitrary<unknown>,
  otherVal: Arbitrary<unknown>
): Arbitrary<Record<string, unknown>> {
  return arrOfKeysArbitrary().chain((keys) =>
    fc.record({
      ...Object.fromEntries(keys.map((key) => [key, otherVal] as const)),
      [reqKey]: reqVal,
    })
  )
}

function objWithPathArbitrary(path: readonly string[], val: unknown): ReturnType<typeof fc.object> {
  const level: Memo<Record<string, unknown>> = fc.memo((n) => {
    if (n <= 1) {
      return recordWithKeyArbitrary(path[path.length - 1], fc.constant(val), fc.anything())
    }
    return recordWithKeyArbitrary(
      path[path.length - n],
      level(n - 1),
      fc.oneof(level(n - 1), level(n - 1), fc.anything())
    )
  })

  return level(path.length)
}

const existsTupleArbitrary = fc.tuple(pathArrayArbitrary, valueArbitrary).chain(([path, val]) => {
  return fc.tuple(objWithPathArbitrary(path, val), fc.constant(path), fc.constant(val))
})

const notExistsTupleArbitrary = fc
  .tuple(pathArrayArbitrary, valueArbitrary, fc.hexaString())
  .chain(([path, val, miss]) => {
    const wrongPath = [...path]
    const missPosition = Math.floor(Math.random() * wrongPath.length)
    wrongPath[missPosition] = wrongPath[missPosition] === miss ? `_${miss}` : miss
    return fc.tuple(objWithPathArbitrary(path, val), fc.constant(wrongPath))
  })

test('Get exists string path from object return correct value', () => {
  fc.assert(
    fc.property(existsTupleArbitrary, ([obj, path, val]) => {
      expect(get(obj, path.join('.'))).toBe(val)
    })
  )
})

test('Get exists string array path from object return correct value', () => {
  fc.assert(
    fc.property(existsTupleArbitrary, ([obj, path, val]) => {
      expect(get(obj, path)).toBe(val)
    })
  )
})

test('Get not exists string path from object return undefined', () => {
  fc.assert(
    fc.property(notExistsTupleArbitrary, ([obj, path]) => {
      expect(get(obj, path.join('.'))).toBeUndefined()
    })
  )
})

test('Get not exists string array path from object return undefined', () => {
  fc.assert(
    fc.property(notExistsTupleArbitrary, ([obj, path]) => {
      expect(get(obj, path)).toBeUndefined()
    })
  )
})
