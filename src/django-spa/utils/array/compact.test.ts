import { fc, testProp } from 'jest-fast-check'

import { compact } from './compact'

const arrArbitrary = fc.array(fc.anything())

testProp('В результирующем массиве нет ни одного falsy значения', [arrArbitrary], (arr) => {
  const result = compact(arr)

  result.forEach((value) => {
    expect(value).not.toBeFalsy()
  })
})

testProp('В результирующем массиве все truthy значения из исходного', [arrArbitrary], (arr) => {
  const result = compact(arr)

  arr
    .filter((v) => !!v)
    .forEach((value) => {
      expect(result.includes(value)).toBeTruthy()
    })
})

testProp('В результирующем массиве нет значений не из исходного', [arrArbitrary], (arr) => {
  const result = compact(arr)

  result.forEach((value) => {
    expect(arr.includes(value)).toBeTruthy()
  })
})
