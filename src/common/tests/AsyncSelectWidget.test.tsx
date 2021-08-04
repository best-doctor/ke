import React from 'react'
import { mount, shallow } from 'enzyme'
import { AsyncPaginate } from 'react-select-async-paginate'

import { AsyncSelectWidget } from '../components/AsyncSelectWidget'
import { testProvider } from '../../setupTests'

test('Async select widget properly rendered', () => {
  const component = shallow(
    <AsyncSelectWidget
      provider={testProvider}
      dataResourceUrl="test.com"
      handleChange={jest.fn()}
      value={{}}
      getOptionLabel={jest.fn()}
      getOptionValue={jest.fn()}
    />
  )

  expect(component.find(AsyncPaginate).length).toEqual(1)
})

test('Async select widget should pass menuPlacement to AsyncPaginate component', () => {
  const component = mount(
    <AsyncSelectWidget
      provider={testProvider}
      dataResourceUrl="test.com"
      handleChange={jest.fn()}
      value={{}}
      getOptionLabel={jest.fn()}
      getOptionValue={jest.fn()}
      menuPlacement="bottom"
    />
  )
  expect(component.find(AsyncPaginate).first().props().menuPlacement).toBe('bottom')
})
