import { createElement } from 'react'
import fc from 'fast-check'
import { renderHook } from '@testing-library/react-hooks'

import { useField } from './Field.hook'
import { fieldValidateResultArbitrary, makeRecordProvider, recordWithValidKeyArbitrary, refArbitrary } from './fixtures'

test('Return correct value from context by key', () => {
  fc.assert(
    fc.property(recordWithValidKeyArbitrary, ([record, key]) => {
      const provider = makeRecordProvider(record, jest.fn())
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
      const onChangeSpy = jest.fn().mockImplementation((cb: (prev: Record<string, unknown>) => void) => cb(record))
      const provider = makeRecordProvider(record, onChangeSpy)
      const { result } = renderHook(() => useField(key), {
        wrapper: ({ children }) => createElement(provider, { children }),
      })

      result.current.onChange(value)

      expect(onChangeSpy).toHaveLastReturnedWith({
        ...record,
        [key]: { ...record[key], value, isTouched: true },
      })
    })
  )
})

test('isTouched is false by default', () => {
  fc.assert(
    fc.property(recordWithValidKeyArbitrary, ([record, key]) => {
      const provider = makeRecordProvider(record, jest.fn())
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
      const onChangeSpy = jest.fn().mockImplementation((cb: (prev: Record<string, unknown>) => void) => cb(record))
      const provider = makeRecordProvider(record, onChangeSpy)
      renderHook(() => useField(key, ref), {
        wrapper: ({ children }) => createElement(provider, { children }),
      })

      expect(onChangeSpy).toHaveLastReturnedWith({
        ...record,
        [key]: { ...record[key], validated: false, relatedRef: ref },
      })
    })
  )
})

test('Without validate callback errors set to null and inValidating set to false', () => {
  fc.assert(
    fc.property(recordWithValidKeyArbitrary, ([record, key]) => {
      const provider = makeRecordProvider(record, jest.fn())
      const { result } = renderHook(() => useField(key), {
        wrapper: ({ children }) => createElement(provider, { children }),
      })

      expect(result.current.inValidating).toBe(false)
      expect(result.current.errors).toBe(null)
    })
  )
})

test('Expect inValidating will be passed to context onChange as true in validation process', async () => {
  await fc.assert(
    fc.asyncProperty(recordWithValidKeyArbitrary, async ([record, key]) => {
      const onChangeSpy = jest.fn().mockImplementation((cb: (prev: Record<string, unknown>) => void) => cb(record))
      const provider = makeRecordProvider(record, onChangeSpy)
      const validateSpy = jest.fn().mockResolvedValue({ success: true })
      const { waitFor } = renderHook(() => useField(key, undefined, validateSpy), {
        wrapper: ({ children }) => createElement(provider, { children }),
      })

      await waitFor(() => expect(onChangeSpy).toBeCalledTimes(3))

      expect(onChangeSpy).nthReturnedWith(2, {
        ...record,
        [key]: {
          ...record[key],
          inValidating: true,
        },
      })
    })
  )
})

test('Expect errors from validate callback will be passed to context onChange', async () => {
  await fc.assert(
    fc.asyncProperty(
      recordWithValidKeyArbitrary,
      fieldValidateResultArbitrary,
      async ([record, key], validateResult) => {
        const onChangeSpy = jest.fn().mockImplementation((cb: (prev: Record<string, unknown>) => void) => cb(record))
        const provider = makeRecordProvider(record, onChangeSpy)
        const validateSpy = jest.fn().mockResolvedValue(validateResult)
        const { waitFor } = renderHook(() => useField(key, undefined, validateSpy), {
          wrapper: ({ children }) => createElement(provider, { children }),
        })

        await waitFor(() => expect(onChangeSpy).toBeCalledTimes(3))

        expect(onChangeSpy).toHaveLastReturnedWith({
          ...record,
          [key]: {
            ...record[key],
            errors: validateResult.errors,
            inValidating: false,
            validated: true,
          },
        })
      }
    )
  )
})
