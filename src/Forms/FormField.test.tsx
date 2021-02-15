import * as React from 'react'
import * as fc from 'fast-check'
import { mount, ReactWrapper } from 'enzyme'
import type { ElementType } from 'react'

import { FormField } from './FormField'
import type { FormsContextData } from './types'
import { FormsContextProvider } from './Forms.context'
import { contextWithValidKeyArbitrary, randomPropsArbitrary } from './fixtures'

function makeMountField(
  name: string | number,
  context: [FormsContextData, (val: FormsContextData) => void],
  asComponent: ElementType,
  addProps = {}
): ReactWrapper {
  // noinspection RequiredAttributes  IntelJ-bug - https://youtrack.jetbrains.com/issue/WEB-48161
  return mount(
    <FormsContextProvider value={context}>
      <FormField name={name} as={asComponent} {...addProps} />
    </FormsContextProvider>
  )
}

test('Create "as"-component', () => {
  fc.assert(
    fc.property(contextWithValidKeyArbitrary, ([context, name]) => {
      const TestControl = jest.fn((): JSX.Element => <div>Test</div>)
      const field = makeMountField(name, [context, jest.fn()], TestControl)

      expect(field.find(TestControl).length).toBe(1)
    })
  )
})

test('Pass context[name] to "as"-component as "value"', () => {
  fc.assert(
    fc.property(contextWithValidKeyArbitrary, ([context, name]) => {
      const TestControlSpy = jest.fn<JSX.Element, [{ value: unknown }]>((): JSX.Element => <div>Test</div>)
      makeMountField(name, [context, jest.fn()], TestControlSpy)

      expect(TestControlSpy).toBeCalledTimes(1)
      const [firstCall] = TestControlSpy.mock.calls
      const [firstArg] = firstCall
      // contextWithValidKeyArbitrary - produce correct context-key pairs
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(firstArg.value).toBe(context[name])
    })
  )
})

test('Pass additional props to "as"-component', () => {
  fc.assert(
    fc.property(contextWithValidKeyArbitrary, randomPropsArbitrary, ([context, name], addProps) => {
      const TestControlSpy = jest.fn<JSX.Element, [{ value: unknown }]>((): JSX.Element => <div>Test</div>)
      makeMountField(name, [context, jest.fn()], TestControlSpy, addProps)

      expect(TestControlSpy).toBeCalledTimes(1)
      const [firstCall] = TestControlSpy.mock.calls
      const [firstArg] = firstCall
      const passedProps = Object.fromEntries(
        Object.entries(firstArg).filter(([key]) => !['value', 'onChange'].includes(key))
      )
      expect(passedProps).toEqual(addProps)
    })
  )
})
