import * as React from 'react'
import type { ReactNode } from 'react'
import * as fc from 'fast-check'
import { renderHook } from '@testing-library/react-hooks'
import { mount } from 'enzyme'

import { dictContextWithValidKeyArbitrary, dictContextArbitrary } from './fixtures'
import { FormsContextProvider, useNodeState } from './Forms.context'
import type { FormsContextData } from './types'
import { FormGroup } from './FormGroup'

function makeGroupWrapper(name: string, context: FormsContextData, setCallback: (val: FormsContextData) => void) {
  return ({ children }: { children?: ReactNode }): JSX.Element => (
    <FormsContextProvider value={[context, setCallback]}>
      <FormGroup name={name}>{children || null}</FormGroup>
    </FormsContextProvider>
  )
}

test('Redefine from context for inner component with dictionary from outer by name props', () => {
  fc.assert(
    fc.property(dictContextWithValidKeyArbitrary, dictContextArbitrary, ([outerContext, name], innerContext) => {
      const outerContextWithInner = { ...outerContext, [name]: innerContext }
      const wrapper = makeGroupWrapper(name, outerContextWithInner, jest.fn())

      const { result } = renderHook(
        () => {
          return [...Object.keys(innerContext)].map((key) => {
            const [field] = useNodeState(key)
            return [key, field]
          })
        },
        { wrapper }
      )

      expect(Object.fromEntries(result.current)).toEqual(innerContext)
    })
  )
})

const notDictionaryArbitrary = fc.anything().filter((val) => {
  return typeof val !== 'object' || val === null || Array.isArray(val)
})

test('Throw exception if outerContext[name] not a dictionary', () => {
  fc.assert(
    fc.property(dictContextWithValidKeyArbitrary, notDictionaryArbitrary, ([outerContext, name], innerContext) => {
      const spy = jest.spyOn(console, 'error') // We waiting for errors on render, so disable logging spam
      spy.mockImplementation(() => {}) // Seems standard not exists https://github.com/facebook/react/issues/11098

      const outerContextWithInner = { ...outerContext, [name]: innerContext }

      expect(() => mount(makeGroupWrapper(name, outerContextWithInner, jest.fn())({}))).toThrow(TypeError)

      spy.mockRestore()
    })
  )
})

test('Pass change from inner context to outer', () => {
  fc.assert(
    fc.property(
      dictContextWithValidKeyArbitrary,
      dictContextArbitrary,
      fc.anything(),
      ([outerContext, name], innerContext, newVal) => {
        const outerContextWithInner = { ...outerContext, [name]: innerContext }
        const outerContextSetter = jest.fn()
        const wrapper = makeGroupWrapper(name, outerContextWithInner, outerContextSetter)

        const { result } = renderHook(
          () => {
            return [...Object.keys(innerContext)].map((key) => {
              const [, setter] = useNodeState(key)
              return [key, setter] as const
            })
          },
          { wrapper }
        )

        const waitedUpdates = result.current.map(([key, setter]) => {
          setter(newVal)
          return {
            ...outerContext,
            [name]: {
              ...innerContext,
              [key]: newVal,
            },
          }
        })

        const outerSetterCallsFirstArgs = outerContextSetter.mock.calls.map((args) => args[0])
        expect(outerSetterCallsFirstArgs).toEqual(waitedUpdates)
      }
    )
  )
})
