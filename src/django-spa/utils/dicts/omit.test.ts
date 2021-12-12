import { fc, testProp } from 'jest-fast-check'

import { omit } from './omit'

const dictWithOmitKeys = fc
  .dictionary(fc.string(), fc.anything())
  .chain((dict) => fc.tuple(fc.constant(dict), fc.shuffledSubarray(Object.keys(dict))))

testProp('Result has not omitted keys', [dictWithOmitKeys], ([source, keys]) => {
  const result = omit(source, keys)

  Object.keys(result).forEach((key) => expect(keys.includes(key)).toBeFalsy())
})

testProp('Result has keys with corresponding source values', [dictWithOmitKeys], ([source, keys]) => {
  const result = omit(source, keys)

  Object.entries(result).forEach(([key, value]) => expect(value).toBe(source[key]))
})
