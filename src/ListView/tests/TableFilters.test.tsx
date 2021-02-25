import React from 'react'
import { mount } from 'enzyme'

import { DebounceInput } from 'react-debounce-input'
import Select from 'react-select'
import DatePicker from 'react-datepicker'

import { AsyncSelectWidget } from '../../common/components/AsyncSelectWidget'
import {
  BaseFilter,
  SelectFilter,
  MultiSelectFilter,
  DateTimeFilter,
  DateFilter,
  ForeignKeySelectFilter,
} from '../components/Table/filters'

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
  useLocation: () => ({
    pathname: 'localhost:0000/appeals/',
  }),
}))

test('Base table filter rendering', () => {
  const component = mount(<BaseFilter />)

  expect(component.find(DebounceInput).length).toEqual(1)
})

test('Select table filter rendering', () => {
  const component = mount(<SelectFilter />)

  expect(component.find(Select).length).toEqual(1)
})

test('Multi select table filter rendering', () => {
  const component = mount(<MultiSelectFilter />)

  expect(component.find(Select).length).toEqual(1)
})

test('Date table filter rendering', () => {
  const component = mount(<DateFilter />)

  expect(component.find(DatePicker).length).toEqual(1)
})

test('DateTime table filter rendering', () => {
  const component = mount(<DateTimeFilter />)

  expect(component.find(DatePicker).length).toEqual(1)
})

test('ForeignKeySelectFilter filter rendering', () => {
  const component = mount(<ForeignKeySelectFilter />)

  expect(component.find(AsyncSelectWidget).length).toEqual(1)
})
