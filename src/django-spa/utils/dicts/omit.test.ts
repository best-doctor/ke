import fc from 'fast-check'

import { omit } from './omit'

const dictWithOmitKeys = fc
  .dictionary(fc.string(), fc.anything())
  .chain((dict) => fc.tuple(fc.constant(dict), fc.shuffledSubarray(Object.keys(dict))))

test("Result hasn't omitted keys", () => {
  fc.assert(
    fc.property(dictWithOmitKeys, ([source, keys]) => {
      const result = omit(source, keys)

      Object.keys(result).forEach((key) => expect(keys.includes(key)).toBeFalsy())
    })
  )
})

test('Result has keys with corresponding source values', () => {
  fc.assert(
    fc.property(dictWithOmitKeys, ([source, keys]) => {
      const result = omit(source, keys)

      Object.entries(result).forEach(([key, value]) => expect(value).toBe(source[key]))
    })
  )
})
