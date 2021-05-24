import fc from 'fast-check'
import { renderHook } from '@testing-library/react-hooks'

import { useRecordRoot } from './RecordRoot.hook'

const recordArbitrary = fc.dictionary(fc.string(), fc.anything())
const recordWithInvalidKeyArbitrary = fc.tuple(recordArbitrary, fc.string()).filter(([record, key]) => !(key in record))
const recordWithNewValueArbitrary = fc
  .tuple(recordArbitrary, fc.anything())
  .filter(([record, value]) => Object.values(record).indexOf(value) < 0)

test('Getter from context return correct value', () => {
  fc.assert(
    fc.property(recordArbitrary, (record) => {
      const { result } = renderHook(() => useRecordRoot(record, jest.fn()))
      const getter = result.current[1].value[0]

      const gotValue = Object.fromEntries(Object.keys(record).map((key) => [key, getter(key)]))

      expect(gotValue).toEqual(record)
    })
  )
})

test('Getter from context throw error if key not exists in data', () => {
  fc.assert(
    fc.property(recordWithInvalidKeyArbitrary, ([record, invalidKey]) => {
      const { result } = renderHook(() => useRecordRoot(record, jest.fn()))
      const getter = result.current[1].value[0]

      expect(() => getter(invalidKey)).toThrow(RangeError)
    })
  )
})

test('Updater from context update correct value', () => {
  fc.assert(
    fc.property(recordWithNewValueArbitrary, ([record, value]) => {
      const onChangeSpy = jest.fn()
      const { result } = renderHook(() => useRecordRoot(record, onChangeSpy))
      const updater = result.current[1].value[1]

      Object.keys(record).forEach((key) => {
        const keyUpdaterSpy = jest.fn().mockReturnValue(value)
        updater(key, keyUpdaterSpy)

        expect(keyUpdaterSpy.mock.calls[0][0]).toBe(record[key])
        expect(onChangeSpy.mock.calls[onChangeSpy.mock.calls.length - 1][0]).toEqual({ ...record, [key]: value })
      })
    })
  )
})

test('Updater from context throw error if key not exists in data', () => {
  fc.assert(
    fc.property(recordWithInvalidKeyArbitrary, ([record, invalidKey]) => {
      const { result } = renderHook(() => useRecordRoot(record, jest.fn()))
      const updater = result.current[1].value[1]

      expect(() => updater(invalidKey, () => undefined)).toThrow(RangeError)
    })
  )
})

test('onChange callback has called on set new value', () => {
  fc.assert(
    fc.property(recordWithNewValueArbitrary, ([record, value]) => {
      const onChangeSpy = jest.fn()
      const { result } = renderHook(() => useRecordRoot(record, onChangeSpy))
      const updater = result.current[1].value[1]

      Object.keys(record).forEach((key) => {
        updater(key, jest.fn().mockReturnValue(value))
      })

      expect(onChangeSpy.mock.calls.length).toBe(Object.keys(record).length)
    })
  )
})

test('onChange callback has not called on set same value', () => {
  fc.assert(
    fc.property(recordArbitrary, (record) => {
      const onChangeSpy = jest.fn()
      const { result } = renderHook(() => useRecordRoot(record, onChangeSpy))
      const updater = result.current[1].value[1]

      Object.keys(record).forEach((key) => {
        updater(key, (prev) => prev)
      })

      expect(onChangeSpy.mock.calls.length).toBe(0)
    })
  )
})
