import fc from 'fast-check'

import { pick } from './Pick'

const dictWithPickKeys = fc
  .dictionary(fc.string(), fc.anything())
  .chain((dict) => fc.tuple(fc.constant(dict), fc.shuffledSubarray(Object.keys(dict))))

test('Result has all picked keys and only them', () => {
  fc.assert(
    fc.property(dictWithPickKeys, ([source, keys]) => {
      const result = pick(source, keys)

      expect(Object.keys(result).length).toBe(keys.length)
      keys.forEach((key) => expect(key in result).toBeTruthy())
    })
  )
})

test('Result has keys with corresponding source values', () => {
  fc.assert(
    fc.property(dictWithPickKeys, ([source, keys]) => {
      const result = pick(source, keys)

      Object.entries(result).forEach(([key, value]) => expect(value).toBe(source[key]))
    })
  )
})
