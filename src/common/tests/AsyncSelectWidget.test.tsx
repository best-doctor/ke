import React from 'react'
import { shallow } from 'enzyme'
import AsyncSelect from 'react-select/async'

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

  expect(component.find(AsyncSelect).length).toEqual(1)
})
