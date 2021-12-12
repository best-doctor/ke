import { fc, testProp } from 'jest-fast-check'

import { pick } from './pick'

const dictWithPickKeys = fc
  .dictionary(fc.string(), fc.anything())
  .chain((dict) => fc.tuple(fc.constant(dict), fc.shuffledSubarray(Object.keys(dict))))

testProp('Result has all picked keys and only them', [dictWithPickKeys], ([source, keys]) => {
  const result = pick(source, keys)

  expect(Object.keys(result).length).toBe(keys.length)
  keys.forEach((key) => expect(key in result).toBeTruthy())
})

testProp('Result has keys with corresponding source values', [dictWithPickKeys], ([source, keys]) => {
  const result = pick(source, keys)

  Object.entries(result).forEach(([key, value]) => expect(value).toBe(source[key]))
})
