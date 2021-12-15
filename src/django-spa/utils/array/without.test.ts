import { fc, testProp } from 'jest-fast-check'
import { without } from '@utils/array/without'

const arrArbitrary = fc.array(fc.anything())

testProp('В результирующем массиве все значения из исходного', [arrArbitrary, arrArbitrary], (arr, exclude) => {
  const result = without(arr, ...exclude)

  result.forEach((value) => {
    expect(arr.includes(value)).toBeTruthy()
  })
})

testProp('В результирующем массиве нет значений из исключений', [arrArbitrary, arrArbitrary], (arr, exclude) => {
  const result = without(arr, ...exclude)

  result.forEach((value) => {
    expect(exclude.includes(value)).toBeFalsy()
  })
})

testProp(
  'Все значения из исходного, не попадающие в исключения, есть в результирующем',
  [arrArbitrary, arrArbitrary],
  (arr, exclude) => {
    const result = without(arr, ...exclude)

    arr
      .filter((v) => !exclude.includes(v))
      .forEach((value) => {
        expect(result.includes(value)).toBeTruthy()
      })
  }
)
