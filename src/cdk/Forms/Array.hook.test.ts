import fc from 'fast-check'
import { renderHook } from '@testing-library/react-hooks'

import { useArray } from './Array.hook'
import { arrayWithValidateResultArbitrary } from './fixtures'

const getKey = (_: unknown, index: number): number => index

test('Return component from rootHook', () => {
  fc.assert(
    fc.property(
      fc.array(fc.anything()),
      fc.dictionary(fc.string(), fc.anything()),
      fc.nat({ max: 5 }),
      (value, componentProps, callCount) => {
        const componentSpy = jest.fn()
        const rootHookSpy = jest.fn().mockReturnValue([componentSpy, componentProps])

        const { result } = renderHook(() => useArray(rootHookSpy, value, jest.fn(), getKey))
        const [component, props] = result.current

        for (let i = 0; i < callCount; i++) {
          component(props)
        }

        expect(componentSpy).toBeCalledTimes(callCount)
        expect(componentSpy.mock.calls).toEqual(Array(callCount).fill([componentProps]))
      }
    )
  )
})

test('By default all fields untouched, has not errors and not in validating', () => {
  fc.assert(
    fc.property(fc.array(fc.anything()), (value) => {
      const rootHookSpy = jest.fn()

      renderHook(() => useArray(rootHookSpy, value, jest.fn(), getKey))

      expect(rootHookSpy.mock.calls[0][0]).toEqual(
        value.map((item) => ({
          value: item,
          inValidating: false,
          validated: false,
          isTouched: false,
          errors: null,
          relatedRef: null,
        }))
      )
    })
  )
})

test('Set all fields inValidating = true while validation process', async () => {
  await fc.assert(
    fc.asyncProperty(arrayWithValidateResultArbitrary, async ([value, errors]) => {
      const rootHookSpy = jest.fn()
      const validateSpy = jest.fn().mockResolvedValue(errors)

      const { waitFor } = renderHook(() => useArray(rootHookSpy, value, jest.fn(), getKey, validateSpy))

      await waitFor(() => expect(rootHookSpy).toBeCalledTimes(3))

      expect(rootHookSpy.mock.calls[1][0]).toEqual(
        value.map((item) => ({
          value: item,
          inValidating: true,
          validated: false,
          isTouched: false,
          errors: null,
          relatedRef: null,
        }))
      )
    })
  )
})

test('Set all fields inValidating = false and errors after validation process', async () => {
  await fc.assert(
    fc.asyncProperty(arrayWithValidateResultArbitrary, async ([value, errors]) => {
      const rootHookSpy = jest.fn()
      const validateSpy = jest.fn().mockResolvedValue(errors)

      const { waitFor } = renderHook(() => useArray(rootHookSpy, value, jest.fn(), getKey, validateSpy))

      await waitFor(() => expect(rootHookSpy).toBeCalledTimes(3))

      expect(rootHookSpy.mock.calls[2][0]).toEqual(
        value.map((item, index) => ({
          value: item,
          inValidating: false,
          validated: true,
          isTouched: false,
          errors: errors[index]?.errors ?? null,
          relatedRef: null,
        }))
      )
    })
  )
})

test('Passthroughs to recordHook same record for same value on rerender', () => {
  fc.assert(
    fc.property(fc.array(fc.anything()), (value) => {
      const rootHookSpy = jest.fn()

      const { rerender } = renderHook(() => useArray(rootHookSpy, value, jest.fn(), getKey))
      rerender()

      expect(rootHookSpy.mock.calls[0][0]).toBe(rootHookSpy.mock.calls[1][0])
    })
  )
})
