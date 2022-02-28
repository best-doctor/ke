import { createContext, createElement } from 'react'
import fc from 'fast-check'
import { renderHook } from '@testing-library/react-hooks'

import { useLeaf } from './Leaf.hook'
import { RootContext } from './types'

const keyArbitrary = fc.oneof(fc.string(), fc.integer({ min: 0 }))

const TestContext = createContext<RootContext>([() => undefined, () => undefined])

test('Retrieve correct value from context by key', () => {
  fc.assert(
    fc.property(keyArbitrary, fc.anything(), (key, value) => {
      const getterSpy = jest.fn().mockReturnValue(value)
      const { result } = renderHook(() => useLeaf(TestContext, key), {
        wrapper: ({ children }) => createElement(TestContext.Provider, { value: [getterSpy, jest.fn()] }, children),
      })

      expect(result.current[0]).toBe(value)
      expect(getterSpy.mock.calls[0]).toEqual([key])
    })
  )
})

test('Updater try to set value from context by key', () => {
  fc.assert(
    fc.property(keyArbitrary, (key) => {
      const setterSpy = jest.fn()
      const { result } = renderHook(() => useLeaf(TestContext, key), {
        wrapper: ({ children }) => createElement(TestContext.Provider, { value: [jest.fn(), setterSpy] }, children),
      })

      const updateLeaf = result.current[1]
      const updater = (): void => undefined
      updateLeaf(updater)

      expect(setterSpy.mock.calls[0]).toEqual([key, updater])
    })
  )
})
