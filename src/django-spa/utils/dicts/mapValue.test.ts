import { fc, testProp } from 'jest-fast-check'
import { expectType } from 'tsd'

import { mapValue } from './mapValue'

const dictArbitrary = fc.dictionary(fc.string(), fc.anything())

testProp('Коллбэк применяется ко всем значениям', [dictArbitrary], (dict) => {
  const cbSpy = jest.fn()

  mapValue(dict, cbSpy)

  expect(cbSpy).toHaveBeenCalledTimes(Object.entries(dict).length)
  Object.entries(dict).forEach(([key, value]) => {
    expect(cbSpy).toHaveBeenCalledWith(value, key)
  })
})

testProp('Соответствие ключ-значение сохраняется для результата', [dictArbitrary], (dict) => {
  const cbSpy = jest.fn().mockImplementation((_, key) => key)

  const result = mapValue(dict, cbSpy)

  Object.entries(result).forEach(([key, value]) => {
    expect(value).toBe(key)
  })
})

describe('Корректный тип у результата', () => {
  test('Простой коллбэк', () => {
    const dict = {
      a: 10,
      b: 'test',
    }
    const callback = (v: string | number): string => JSON.stringify(v)

    expectType<{ a: string; b: string }>(mapValue(dict, callback))
  })

  test('Дженерик-коллбэк', () => {
    const dict = {
      a: 10,
      b: 'test',
    }
    const callback = <T>(v: T): T => v

    expectType<{ a: number | string; b: string | number }>(mapValue(dict, callback))
  })
})
