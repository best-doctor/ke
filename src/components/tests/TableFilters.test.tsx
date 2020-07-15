import * as React from 'react'
import { mount } from 'enzyme'

import { DebounceInput } from 'react-debounce-input'
import Select from 'react-select'
import DatePicker from 'react-datepicker'

import { BaseFilter, SelectFilter, MultiSelectFilter, DateTimeFilter, DateFilter } from '../Table/filters'

test('Base table filter rendering', () => {
  const component = mount(<BaseFilter column={{ column: {} }} />)

  expect(component.find(DebounceInput).length).toEqual(1)
})

test('Select table filter rendering', () => {
  const component = mount(<SelectFilter column={{ column: {} }} />)

  expect(component.find(Select).length).toEqual(1)
})

test('Multi select table filter rendering', () => {
  const component = mount(<MultiSelectFilter column={{ column: {} }} />)

  expect(component.find(Select).length).toEqual(1)
})

test('Date table filter rendering', () => {
  const component = mount(<DateFilter column={{ column: {} }} />)

  expect(component.find(DatePicker).length).toEqual(1)
})

test('DateTime table filter rendering', () => {
  const component = mount(<DateTimeFilter column={{ column: {} }} />)

  expect(component.find(DatePicker).length).toEqual(1)
})
