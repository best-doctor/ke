import * as React from 'react'
import { createRef } from 'react'
import fc from 'fast-check'
import { mount } from 'enzyme'

import { Input, Select, Textarea } from './Standard'

const valueArbitrary = fc.string()

const changesTupleArbitrary = fc
  .tuple(valueArbitrary, fc.array(valueArbitrary, { minLength: 1, maxLength: 5 }))
  .filter(([val, changes]) => val !== changes[0])
  .map(([val, changes]) => [val, [...new Set(changes)]] as [string, string[]])

const onChangeArbitrary = fc.func(fc.constant(undefined))

describe.each([
  ['input', HTMLInputElement, Input],
  ['textarea', HTMLTextAreaElement, Textarea],
  ['select', HTMLSelectElement, Select],
])('Adapter for "%s"', (name, Element, Adapter) => {
  test(`Adapter includes only "${name}" element`, () => {
    fc.assert(
      fc.property(valueArbitrary, onChangeArbitrary, (value, onChange) => {
        const component = mount(<Adapter value={value} onChange={onChange} />)

        expect(component.children().length).toBe(1)
        expect(component.children().first().instance()).toBeInstanceOf(Element)
      })
    )
  })

  test(`Adapter forward "${name}" ref`, () => {
    fc.assert(
      fc.property(valueArbitrary, onChangeArbitrary, (value, onChange) => {
        const ref = createRef<InstanceType<typeof Element>>()
        // Don't know how to define relation between Adapter and Element, but this is correct
        // @ts-ignore
        const component = mount(<Adapter ref={ref} value={value} onChange={onChange} />)

        expect(ref.current).toBeInstanceOf(Element)
        expect(ref.current).toBe(component.children().first().instance())
      })
    )
  })

  test(`Adapter forward "${name}" changes value`, () => {
    fc.assert(
      fc.property(changesTupleArbitrary, ([value, changes]) => {
        const mockOnChange = jest.fn()
        const component = mount(<Adapter value={value} onChange={mockOnChange} />)
        const input = component.find(name)

        changes.forEach((changedValue) =>
          input.simulate('change', {
            target: {
              value: changedValue,
            },
          })
        )

        expect(mockOnChange.mock.calls).toEqual(changes.map((changedValue) => [changedValue]))
      })
    )
  })

  test(`Adapter inner "${name}" got props.value`, () => {
    fc.assert(
      fc.property(valueArbitrary, onChangeArbitrary, (value, onChange) => {
        const component = mount(<Adapter value={value} onChange={onChange} />)

        expect(component.find(name).prop('value')).toBe(value)
      })
    )
  })
})
