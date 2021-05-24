import fc from 'fast-check'
import { renderHook } from '@testing-library/react-hooks'

import { useArrayRoot } from './ArrayRoot.hook'

const arrayArbitrary = fc.array(fc.anything())
const arrayWithInvalidKeyArbitrary = fc
  .tuple(arrayArbitrary, fc.integer())
  .filter(([arr, key]) => key < 0 || key > arr.length)
const arrayWithNewValueArbitrary = fc
  .tuple(arrayArbitrary, fc.anything())
  .filter(([array, value]) => array.indexOf(value) < 0)

function getKeyIndex(_: unknown, index: number): number {
  return index
}

test('Getter from context return correct value', () => {
  fc.assert(
    fc.property(arrayArbitrary, (array) => {
      const { result } = renderHook(() => useArrayRoot(array, jest.fn(), getKeyIndex))
      const getter = result.current[1].value[0]

      const gotValue = array.map((_, index) => getter(index))

      expect(gotValue).toEqual(array)
    })
  )
})

test('Getter from context throw error if key not exists in data', () => {
  fc.assert(
    fc.property(arrayWithInvalidKeyArbitrary, ([array, invalidKey]) => {
      const { result } = renderHook(() => useArrayRoot(array, jest.fn(), getKeyIndex))
      const getter = result.current[1].value[0]

      expect(() => getter(invalidKey)).toThrow(RangeError)
    })
  )
})

test('Updater from context update correct value', () => {
  fc.assert(
    fc.property(arrayWithNewValueArbitrary, ([array, value]) => {
      const onChangeSpy = jest.fn()
      const { result } = renderHook(() => useArrayRoot(array, onChangeSpy, getKeyIndex))
      const updater = result.current[1].value[1]

      array.forEach((_, index) => {
        const keyUpdaterSpy = jest.fn().mockReturnValue(value)
        updater(index, keyUpdaterSpy)

        expect(keyUpdaterSpy.mock.calls[0][0]).toBe(array[index])
        const updated = [...array]
        updated[index] = value
        expect(onChangeSpy.mock.calls[onChangeSpy.mock.calls.length - 1][0]).toEqual(updated)
      })
    })
  )
})

test('Updater from context throw error if key not exists in data', () => {
  fc.assert(
    fc.property(arrayWithInvalidKeyArbitrary, ([array, invalidKey]) => {
      const { result } = renderHook(() => useArrayRoot(array, jest.fn(), getKeyIndex))
      const updater = result.current[1].value[1]

      expect(() => updater(invalidKey, () => undefined)).toThrow(RangeError)
    })
  )
})

test('onChange callback has called on set new value', () => {
  fc.assert(
    fc.property(arrayWithNewValueArbitrary, ([array, value]) => {
      const onChangeSpy = jest.fn()
      const { result } = renderHook(() => useArrayRoot(array, onChangeSpy, getKeyIndex))
      const updater = result.current[1].value[1]

      array.forEach((_, key) => {
        updater(key, jest.fn().mockReturnValue(value))
      })

      expect(onChangeSpy.mock.calls.length).toBe(Object.keys(array).length)
    })
  )
})

test('onChange callback has not called on set same value', () => {
  fc.assert(
    fc.property(arrayArbitrary, (array) => {
      const onChangeSpy = jest.fn()
      const { result } = renderHook(() => useArrayRoot(array, onChangeSpy, getKeyIndex))
      const updater = result.current[1].value[1]

      array.forEach((_, key) => {
        updater(key, (prev) => prev)
      })

      expect(onChangeSpy.mock.calls.length).toBe(0)
    })
  )
})
