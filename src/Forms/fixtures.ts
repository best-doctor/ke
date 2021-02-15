import * as fc from 'fast-check'

const dictContextArbitrary = fc.dictionary(fc.string({ minLength: 1, maxLength: 10 }), fc.anything())

export const dictContextWithValidKeyArbitrary = dictContextArbitrary
  .filter((dict) => !![...Object.keys(dict)].length)
  .map((dict) => [dict, [...Object.keys(dict)][0]] as const)

export const dictContextWithInvalidKeyArbitrary = fc
  .tuple(dictContextArbitrary, fc.string({ minLength: 1, maxLength: 10 }))
  .filter(([dict, key]) => !(key in dict))

const arrContextArbitrary = fc.array(fc.anything(), { minLength: 0, maxLength: 50 })

export const arrContextWithValidKeyArbitrary = arrContextArbitrary
  .filter((arr) => !!arr.length)
  .map((arr) => [arr, Math.floor(Math.random() * arr.length)] as const)

export const arrContextWithInvalidKeyArbitrary = fc.tuple(
  arrContextArbitrary,
  fc.oneof(fc.string(), fc.integer(Number.MIN_SAFE_INTEGER, -1))
)

export const contextWithValidKeyArbitrary = fc.oneof(dictContextWithValidKeyArbitrary, arrContextWithValidKeyArbitrary)

export const randomPropsArbitrary = fc.dictionary(fc.lorem({ maxCount: 1 }), fc.anything())
