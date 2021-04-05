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
  MaskFilter,
} from '../components/Table/filters'
import { testProvider } from '../../setupTests'

const filterProps = {
  name: 'name',
  label: 'label',
  resourceName: 'resourceName',
}

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
  useLocation: () => ({
    pathname: 'localhost:0000/appeals/',
  }),
}))

test('Base table filter rendering', () => {
  const component = mount(<BaseFilter {...filterProps} />)

  expect(component.find(DebounceInput).length).toEqual(1)
})

test('Mask table filter rendering', () => {
  const component = mount(<MaskFilter {...filterProps} mask="99-99-99" />)

  expect(component.find(DebounceInput).length).toEqual(1)
})

test('Select table filter rendering', () => {
  const component = mount(<SelectFilter {...filterProps} filterResource="filterResource" />)

  expect(component.find(Select).length).toEqual(1)
})

test('Multi select table filter rendering', () => {
  const component = mount(<MultiSelectFilter {...filterProps} filterResource="filterResource" />)

  expect(component.find(Select).length).toEqual(1)
})

test('Date table filter rendering', () => {
  const component = mount(<DateFilter {...filterProps} />)

  expect(component.find(DatePicker).length).toEqual(1)
})

test('DateTime table filter rendering', () => {
  const component = mount(<DateTimeFilter {...filterProps} />)

  expect(component.find(DatePicker).length).toEqual(1)
})

test('ForeignKeySelectFilter filter rendering', () => {
  const component = mount(
    <ForeignKeySelectFilter
      {...filterProps}
      filterResource="filterResource"
      provider={testProvider}
      optionLabel={() => ''}
      optionValue={() => ''}
    />
  )

  expect(component.find(AsyncSelectWidget).length).toEqual(1)
})
