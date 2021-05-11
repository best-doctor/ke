import * as React from 'react'
import * as fc from 'fast-check'
import { act, renderHook } from '@testing-library/react-hooks'
import type { ReactNode } from 'react'

import { useField } from './Field.hook'
import { ValueContext } from './Value.context'
import type { FormValue } from './types'
import {
  arrContextWithInvalidKeyArbitrary,
  arrContextWithValidKeyArbitrary,
  dictContextWithInvalidKeyArbitrary,
  dictContextWithValidKeyArbitrary,
} from './fixtures'

const FormValueProvider = ValueContext.Provider

function makeContextWrapper(context: FormValue, setCallback: (val: FormValue) => void) {
  return ({ children }: { children: ReactNode }): JSX.Element => (
    <FormValueProvider value={[context, setCallback]}>{children}</FormValueProvider>
  )
}

describe('useField - return state tuple from current context for got key', () => {
  test.each([
    ['dict', dictContextWithValidKeyArbitrary],
    ['array', arrContextWithValidKeyArbitrary],
  ])('Return correct data for %s context', (_, arbitrary) => {
    fc.assert(
      // arbitrary produce correct context-key pairs
      // @ts-ignore
      fc.property(arbitrary, ([context, key]) => {
        const wrapper = makeContextWrapper(context, jest.fn())

        const { result } = renderHook(() => useField(key), { wrapper })

        expect(result.current[0]).toBe(context[key])
      })
    )
  })

  test('Returned set callback updates exists state-data of dict context', () => {
    fc.assert(
      fc.property(dictContextWithValidKeyArbitrary, fc.anything(), ([dict, key], updates) => {
        const setter = jest.fn()
        const wrapper = makeContextWrapper(dict, setter)

        const { result } = renderHook(() => useField(key), { wrapper })

        const [, keySetter] = result.current
        act(() => {
          keySetter(updates)
        })

        expect(setter.mock.calls.length).toBe(1)
        expect(setter.mock.calls[0]).toEqual([{ ...dict, [key]: updates }])
      })
    )
  })

  test('Returned set callback updates exists state-data of array context', () => {
    fc.assert(
      fc.property(arrContextWithValidKeyArbitrary, fc.anything(), ([arr, key], updates) => {
        const setter = jest.fn()
        const wrapper = makeContextWrapper(arr, setter)

        const { result } = renderHook(() => useField(key), { wrapper })
        const [, keySetter] = result.current
        act(() => {
          keySetter(updates)
        })

        const waitFor = [...arr]
        waitFor[key] = updates
        expect(setter.mock.calls.length).toBe(1)
        expect(setter.mock.calls[0]).toEqual([waitFor])
      })
    )
  })

  test('Throw exception if key not exists in dictionary context', () => {
    fc.assert(
      fc.property(dictContextWithInvalidKeyArbitrary, ([dict, key]) => {
        const wrapper = makeContextWrapper(dict, jest.fn())

        const { result } = renderHook(() => useField(key), { wrapper })

        expect(result.error).toBeInstanceOf(RangeError)
      })
    )
  })

  test('Throw exception if key not positive integer in array context', () => {
    fc.assert(
      fc.property(arrContextWithInvalidKeyArbitrary, ([arr, key]) => {
        const wrapper = makeContextWrapper(arr, jest.fn())

        const { result } = renderHook(() => useField(key), { wrapper })

        expect(result.error).toBeInstanceOf(TypeError)
      })
    )
  })
})
