import { createElement, FC, PropsWithChildren } from 'react'
import fc from 'fast-check'
import { renderHook } from '@testing-library/react-hooks'

import { useRecordRoot } from './ContextTree'
import { useField } from './Field.hook'

const refArbitrary = fc.record({
  current: fc.constant(null),
})
const fieldArbitrary = fc.record({
  value: fc.anything(),
  isTouched: fc.constant(false),
  inValidating: fc.constant(false),
  errors: fc.constant(null),
  relatedRef: refArbitrary,
})
const recordArbitrary = fc.dictionary(fc.string(), fieldArbitrary)
const recordWithValidKeyArbitrary = recordArbitrary
  .filter((record) => Object.keys(record).length > 0)
  .chain((record) => fc.tuple(fc.constant(record), fc.constantFrom(...Object.keys(record))))

function makeProvider(record: Record<string, unknown>, onChange: (val: unknown) => void): FC<PropsWithChildren<{}>> {
  const {
    result: {
      current: [provider, providerProps],
    },
  } = renderHook(() => useRecordRoot(record, onChange))

  return ({ children }) => createElement(provider, { ...providerProps, children })
}

test('Return correct value from context by key', () => {
  fc.assert(
    fc.property(recordWithValidKeyArbitrary, ([record, key]) => {
      const provider = makeProvider(record, jest.fn())
      const { result } = renderHook(() => useField(key), {
        wrapper: ({ children }) => createElement(provider, { children }),
      })

      expect(result.current.value).toBe(record[key].value)
    })
  )
})

test('onChange callback propose changed value to context', () => {
  fc.assert(
    fc.property(recordWithValidKeyArbitrary, fc.anything(), ([record, key], value) => {
      const onChangeSpy = jest.fn()
      const provider = makeProvider(record, onChangeSpy)
      const { result } = renderHook(() => useField(key), {
        wrapper: ({ children }) => createElement(provider, { children }),
      })

      result.current.onChange(value)

      const callsCount = onChangeSpy.mock.calls.length
      expect(onChangeSpy.mock.calls[callsCount - 1][0]).toEqual({
        ...record,
        [key]: { ...record[key], value, isTouched: true },
      })
    })
  )
})

test('isTouched is false by default', () => {
  fc.assert(
    fc.property(recordWithValidKeyArbitrary, ([record, key]) => {
      const provider = makeProvider(record, jest.fn())
      const { result } = renderHook(() => useField(key), {
        wrapper: ({ children }) => createElement(provider, { children }),
      })

      expect(result.current.isTouched).toBe(false)
    })
  )
})

test('Propose controlRef param to context data as related ref', () => {
  fc.assert(
    fc.property(recordWithValidKeyArbitrary, refArbitrary, ([record, key], ref) => {
      const onChangeSpy = jest.fn()
      const provider = makeProvider(record, onChangeSpy)
      renderHook(() => useField(key, ref), {
        wrapper: ({ children }) => createElement(provider, { children }),
      })

      const callsCount = onChangeSpy.mock.calls.length
      expect(onChangeSpy.mock.calls[callsCount - 1][0]).toEqual({
        ...record,
        [key]: { ...record[key], relatedRef: ref },
      })
    })
  )
})

test('Without validate callback errors set to null and inValidating set to false', () => {
  fc.assert(
    fc.property(recordWithValidKeyArbitrary, ([record, key]) => {
      const provider = makeProvider(record, jest.fn())
      const { result } = renderHook(() => useField(key), {
        wrapper: ({ children }) => createElement(provider, { children }),
      })

      expect(result.current.inValidating).toBe(false)
      expect(result.current.errors).toBe(null)
    })
  )
})
