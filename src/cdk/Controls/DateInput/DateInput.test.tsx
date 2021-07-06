import React from 'react'
import { mount, shallow } from 'enzyme'
import { act } from 'react-dom/test-utils'
import DatePicker from 'react-datepicker'

import { DateInput } from '@cdk/Controls'
import { StyleDateTime } from '../../../common/components/BaseDateTimeRangeWidget'

const onChangeMock = jest.fn()

const getComponent = (): JSX.Element => <DateInput value={new Date()} onChange={onChangeMock} />

test('DateInput properly rendered', () => {
  const component = shallow(getComponent())

  expect(component.find(StyleDateTime).length).toEqual(1)
  expect(component.find(DatePicker).length).toEqual(1)
})

test('DateInput properly handle event', () => {
  const component = mount(getComponent())

  act(() => {
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

  expect(component.find(DatePicker).first().props().className).toBe('some-class-name')
})

test('DateInput should pass isClearable into DatePicker', () => {
  const component = mount(<DateInput value={new Date()} onChange={onChangeMock} isClearable />)

  expect(component.find(DatePicker).first().props().isClearable).toBe(true)
  expect(component.find(DatePicker).first().find('button').length).toEqual(1)
})
