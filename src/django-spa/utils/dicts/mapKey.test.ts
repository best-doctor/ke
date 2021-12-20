import { fc, testProp } from 'jest-fast-check'
import { expectType } from 'tsd'

import { mapKey } from './mapKey'

const dictArbitrary = fc.dictionary(fc.string(), fc.anything())

testProp('Коллбэк применяется ко всем ключам', [dictArbitrary], (dict) => {
  const cbSpy = jest.fn()

  mapKey(dict, cbSpy)

  expect(cbSpy).toHaveBeenCalledTimes(Object.entries(dict).length)
  Object.entries(dict).forEach(([key, value]) => {
    expect(cbSpy).toHaveBeenCalledWith(key, value)
  })
})

testProp('Соответствие ключ-значение сохраняется для результата', [dictArbitrary], (dict) => {
  const cbSpy = jest.fn().mockImplementation((key, value) => `${key}_${JSON.stringify(value)}`)

  const result = mapKey(dict, cbSpy)

  Object.entries(result).forEach(([key, value]) => {
    expect(key.endsWith(`_${JSON.stringify(value)}`)).toBeTruthy()
  })
})

describe('Корректный тип у результата', () => {
  test('Простой коллбэк', () => {
    const dict = {
      a: 10,
      b: 'test',
    }
    const callback = (k: string): Uppercase<string> => k.toUpperCase()

    expectType<Record<string, string | number>>(mapKey(dict, callback))
  })

  test('Дженерик-коллбэк', () => {
    const dict = {
      a: 10,
      b: 'test',
    }
    const callback = <K extends string>(k: K): Uppercase<K> => k.toUpperCase() as Uppercase<K>

    expectType<Record<'A' | 'B', string | number>>(mapKey(dict, callback))
  })
})
