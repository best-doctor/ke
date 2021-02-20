import * as React from 'react'
import type { ReactNode } from 'react'
import * as fc from 'fast-check'
import { act, renderHook } from '@testing-library/react-hooks'

import { arrContextArbitrary, dictContextArbitrary } from './fixtures'
import { Form } from './Form'
import { useNodeState } from './Forms.context'

test('Provide props dict-value into FormsContext for children', () => {
  fc.assert(
    fc.property(dictContextArbitrary, (value) => {
      const setter = jest.fn()
      const wrapper = ({ children }: { children: ReactNode }): JSX.Element => (
        <Form value={value} onChange={setter}>
          {children}
        </Form>
      )

      const { result } = renderHook(
        () => {
          return [...Object.keys(value)].map((key) => {
            const [field] = useNodeState(key)
            return [key, field]
          })
        },
        { wrapper }
      )

      expect(Object.fromEntries(result.current)).toEqual(value)
    })
  )
})

test('Provide props array-value into FormsContext for children', () => {
  fc.assert(
    fc.property(arrContextArbitrary, (value) => {
      const setter = jest.fn()
      const wrapper = ({ children }: { children: ReactNode }): JSX.Element => (
        <Form value={value} onChange={setter}>
          {children}
        </Form>
      )

      const { result } = renderHook(
        () => {
          return value.map((_, key) => {
            const [field] = useNodeState(key)
            return field
          })
        },
        { wrapper }
      )

      expect(result.current).toEqual(value)
    })
  )
})

test('Provide props onChange into FormsContext for children', () => {
  fc.assert(
    fc.property(dictContextArbitrary, fc.anything(), (value, newVal) => {
      const contextSetter = jest.fn()
      const wrapper = ({ children }: { children: ReactNode }): JSX.Element => (
        <Form value={value} onChange={contextSetter}>
          {children}
        </Form>
      )

      const { result } = renderHook(
        () => {
          return [...Object.keys(value)].map((key) => {
            const [, setter] = useNodeState(key)
            return [key, setter] as const
          })
        },
        { wrapper }
      )

      const waitedUpdates = result.current.map(([key, setter]) => {
        act(() => setter(newVal))
        return {
          ...value,
          [key]: newVal,
        }
      })

      const contextSetterCallsFirstArgs = contextSetter.mock.calls.map((args) => args[0])
      expect(contextSetterCallsFirstArgs).toEqual(waitedUpdates)
    })
  )
})
