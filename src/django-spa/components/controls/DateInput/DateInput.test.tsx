import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import DatePicker from 'react-datepicker'

import { DateInput } from './DateInput'
import { ChakraDateInput } from './ChakraDateInput'

const onChangeMock = jest.fn()

const getComponent = (): JSX.Element => <DateInput value={new Date()} onChange={onChangeMock} />

test('DateInput properly rendered', () => {
  const component = mount(getComponent())

  expect(component.find(DatePicker).length).toEqual(1)
  expect(component.find(ChakraDateInput).length).toEqual(1)
  expect(component.find(DatePicker).first().props().showTimeSelect).toEqual(false)
})

test('DateInput properly handle event', () => {
  const component = mount(getComponent())

  act(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    component.find(DatePicker).first().props().onChange(new Date('2021-01-02T00:00:00'), undefined)
  })

  expect(onChangeMock).toHaveBeenCalledWith(new Date('2021-01-02T00:00:00'))
})

test('DateInput should pass dateFormat into DatePicker', () => {
  const component = mount(<DateInput value={new Date()} onChange={onChangeMock} dateFormat="yyyy.MM.dd" />)

  expect(component.find(DatePicker).first().props().dateFormat).toBe('yyyy.MM.dd')
})

test('DateInput should pass className into DatePicker', () => {
  const component = mount(<DateInput value={new Date()} onChange={onChangeMock} className="some-class-name" />)

  expect(component.find(DatePicker).first().props().className).toContain('some-class-name')
})

test('DateInput should pass isClearable into DatePicker', () => {
  const component = mount(<DateInput value={new Date()} onChange={onChangeMock} isClearable />)

  expect(component.find(DatePicker).first().props().isClearable).toBe(true)
  expect(component.find(DatePicker).first().find('button').length).toEqual(1)
})