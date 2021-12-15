import { fc, testProp } from 'jest-fast-check'

import { byKey } from './byKey'

const arrOfDictArbitrary = fc.array(fc.string(), { minLength: 1 }).chain((keys) => {
  const recordStruct = Object.fromEntries(keys.map((key) => [key, fc.anything()]))
  return fc.array(fc.record(recordStruct))
})

const arrOfDictWithRandomKeyArbitrary = arrOfDictArbitrary.chain((arr) => {
  const keyArbitrary = arr.length ? fc.constantFrom(...Object.keys(arr[0])) : fc.constant('dumb')
  return fc.tuple(fc.constant(arr), keyArbitrary)
})

testProp('Получаем корректные значения из всех словарей', [arrOfDictWithRandomKeyArbitrary], ([arr, key]) => {
  const result = byKey(arr, key)

  result.forEach((value, index) => {
    expect(value).toBe(arr[index][key])
  })
})
