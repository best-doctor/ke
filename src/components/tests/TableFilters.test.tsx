import * as React from 'react'
import { mount } from 'enzyme'

import { DebounceInput } from 'react-debounce-input'
import Select from 'react-select'

import { BaseFilter, SelectFilter, MultiSelectFilter } from '../Table/filters'

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
