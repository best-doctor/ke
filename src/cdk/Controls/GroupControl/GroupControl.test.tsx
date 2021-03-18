import React from 'react'
import fc from 'fast-check'
import { mount } from 'enzyme'
import { FormField } from '@cdk/Forms'

import { GroupControl } from './GroupControl'

const Control = ({ value, onChange }: { value: string; onChange: (v: string) => void }): JSX.Element => (
  <input value={value} onChange={(e) => onChange(e.target.value)} />
)

const testTags = ['div', 'p', 'span'].map((tag) => fc.constant(tag))
const elementArbitrary = fc
  .tuple(fc.string({ minLength: 3, maxLength: 10 }), fc.oneof(...testTags))
  .map(([key, tag]) => React.createElement(tag, { key }))
const valueArbitrary = fc.dictionary(
  fc.string({ minLength: 1, maxLength: 10 }),
  fc.string({ minLength: 1, maxLength: 10 })
)

test('Children has rendered', () => {
  fc.assert(
    fc.property(fc.array(elementArbitrary, { minLength: 1, maxLength: 10 }), valueArbitrary, (elements, value) => {
      const groupControl = mount(
        <GroupControl value={value} onChange={jest.fn()}>
          {elements}
        </GroupControl>
      )

      expect(groupControl.children().map((child) => child.getElement())).toEqual(elements)
    })
  )
})

test('Throw error if has child control with unknown name', () => {
  fc.assert(
    fc.property(
      valueArbitrary.filter((value) => !!Object.keys(value).length),
      (value) => {
        const invalidValue = { ...value }
        const missedName = Object.keys(invalidValue).pop() as string
        delete invalidValue[missedName]

        const spy = jest.spyOn(console, 'error') // We waiting for errors on render, so disable logging spam
        spy.mockImplementation(() => {}) // Seems standard not exists https://github.com/facebook/react/issues/11098

        expect(() =>
          mount(
            <GroupControl value={invalidValue} onChange={jest.fn()}>
              {Object.keys(value).map((name) => (
                <FormField key={name} as={Control} name={name} />
              ))}
            </GroupControl>
          )
        ).toThrow(RangeError)

        spy.mockRestore()
      }
    )
  )
})

test('Value destructs to child controls by names', () => {
  fc.assert(
    fc.property(
      valueArbitrary.filter((value) => !!Object.keys(value).length),
      (value) => {
        const groupControl = mount(
          <GroupControl value={value} onChange={jest.fn()}>
            {Object.keys(value).map((name) => (
              <FormField key={name} as={Control} name={name} />
            ))}
          </GroupControl>
        )

        const controlPairs = groupControl
          .find(FormField)
          .map((formField) => [formField.prop('name'), formField.find(Control).first()] as const)
        const controlValuePairs = controlPairs.map(([name, control]) => [name, control.prop('value')])

        expect(Object.fromEntries(controlValuePairs)).toEqual(value)
      }
    )
  )
})

test('Changes in child controls pop ups to root', () => {
  fc.assert(
    fc.property(
      valueArbitrary.filter((value) => !!Object.keys(value).length),
      fc.string(),
      (value, changed) => {
        const onChange = jest.fn()
        const groupControl = mount(
          <GroupControl value={value} onChange={onChange}>
            {Object.keys(value).map((name) => (
              <FormField key={name} as={Control} name={name} />
            ))}
          </GroupControl>
        )

        const controlPairs = groupControl
          .find(FormField)
          .map((formField) => [formField.prop('name'), formField.find(Control).first()] as const)

        let updated = { ...value }
        controlPairs.forEach(([key, control], index) => {
          control.find('input').simulate('change', {
            target: {
              value: changed,
            },
          })

          updated = { ...updated, [key]: changed }
          expect(onChange.mock.calls[index][0]).toEqual(updated)
        })
      }
    )
  )
})
