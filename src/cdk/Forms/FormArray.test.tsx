import * as React from 'react'
import type { ReactNode } from 'react'
import * as fc from 'fast-check'
import { renderHook } from '@testing-library/react-hooks'
import { mount } from 'enzyme'

import { dictContextWithValidKeyArbitrary, arrContextArbitrary } from './fixtures'
import { FormsContextProvider, useNodeState } from './Forms.context'
import type { FormsContextData } from './types'
import { FormArray } from './FormArray'

function makeArrayWrapper(name: string, context: FormsContextData, setCallback: (val: FormsContextData) => void) {
  return ({ children }: { children?: ReactNode }): JSX.Element => (
    <FormsContextProvider value={[context, setCallback]}>
      <FormArray name={name}>{children || null}</FormArray>
    </FormsContextProvider>
  )
}

test('Redefine from context for inner component with array from outer by name props', () => {
  fc.assert(
    fc.property(dictContextWithValidKeyArbitrary, arrContextArbitrary, ([outerContext, name], innerContext) => {
      const outerContextWithInner = { ...outerContext, [name]: innerContext }
      const wrapper = makeArrayWrapper(name, outerContextWithInner, jest.fn())

      const { result } = renderHook(
        () =>
          innerContext.map((_, key) => {
            const [field] = useNodeState(key)
            return field
          }),
        { wrapper }
      )

      expect(result.current).toEqual(innerContext)
    })
  )
})

const notArrArbitrary = fc.anything().filter((val) => !Array.isArray(val))

test('Throw exception if outerContext[name] not a array', () => {
  fc.assert(
    fc.property(dictContextWithValidKeyArbitrary, notArrArbitrary, ([outerContext, name], innerContext) => {
      const spy = jest.spyOn(console, 'error') // We waiting for errors on render, so disable logging spam
      spy.mockImplementation(() => {}) // Seems standard not exists https://github.com/facebook/react/issues/11098

      const outerContextWithInner = { ...outerContext, [name]: innerContext }

      expect(() => mount(makeArrayWrapper(name, outerContextWithInner, jest.fn())({}))).toThrow(TypeError)

      spy.mockRestore()
    })
  )
})

test('Pass change from inner context to outer', () => {
  fc.assert(
    fc.property(
      dictContextWithValidKeyArbitrary,
      arrContextArbitrary,
      fc.anything(),
      ([outerContext, name], innerContext, newVal) => {
        const outerContextWithInner = { ...outerContext, [name]: innerContext }
        const outerContextSetter = jest.fn()
        const wrapper = makeArrayWrapper(name, outerContextWithInner, outerContextSetter)

        const { result } = renderHook(
          () =>
            innerContext.map((_, key) => {
              const [, setter] = useNodeState(key)
              return setter
            }),
          { wrapper }
        )

        const waitedUpdates = result.current.map((setter, index) => {
          setter(newVal)
          const updatedInner = [...innerContext]
          updatedInner[index] = newVal
          return {
            ...outerContext,
            [name]: updatedInner,
          }
        })

        const outerSetterCallsFirstArgs = outerContextSetter.mock.calls.map((args) => args[0])
        expect(outerSetterCallsFirstArgs).toEqual(waitedUpdates)
      }
    )
  )
})
