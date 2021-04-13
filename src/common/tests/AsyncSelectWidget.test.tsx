import React from 'react'
import { shallow } from 'enzyme'
import AsyncPaginate from 'react-select-async-paginate'

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
