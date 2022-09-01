import React from 'react'
import { mount } from 'enzyme'
import { AsyncPaginate } from 'react-select-async-paginate'

import { AsyncSelectWidget } from '../components/AsyncSelectWidget'
import { ThemeProvider } from '../../styles'
import { ResourceProvider } from '../../data-provider'

test('Async select widget properly rendered', () => {
  const component = mount(
    <ResourceProvider>
      <AsyncSelectWidget
        dataResourceUrl="https://test.com"
        handleChange={jest.fn()}
        value={{}}
        getOptionLabel={jest.fn()}
        getOptionValue={jest.fn()}
      />
    </ResourceProvider>
  )

  expect(component.find(AsyncPaginate).length).toEqual(1)
})

test('Async select widget should pass menuPlacement to AsyncPaginate component', () => {
  const component = mount(
    <ThemeProvider>
      <ResourceProvider>
        <AsyncSelectWidget
          dataResourceUrl="https://test.com"
          handleChange={jest.fn()}
          value={{}}
          getOptionLabel={jest.fn()}
          getOptionValue={jest.fn()}
          menuPlacement="bottom"
        />
      </ResourceProvider>
    </ThemeProvider>
  )
  expect(component.find(AsyncPaginate).first().props().menuPlacement).toBe('bottom')
})
