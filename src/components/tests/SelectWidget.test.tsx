import * as React from 'react'
import { shallow } from 'enzyme'
import { FormLabel, Box, Select } from '@chakra-ui/core'

import { SelectWidget } from '../SelectWidget'
import { testProvider } from '../../setupTests'

const detailObject = {
  id: 100500,
  last_name: 'test',
  status: {
    value: 'success',
    text: 'Success',
  },
}

test('Select widget properly rendered', () => {
  const component = shallow(
    <SelectWidget
      name="status.text"
      helpText="test"
      displayValue={undefined}
      detailObject={detailObject}
      dataSource={jest.fn()}
      dataTarget={jest.fn()}
      targetPayload={jest.fn()}
      setObject={jest.fn()}
      provider={testProvider}
      style={{}}
      notifier={jest.fn()}
    />
  )

  expect(component.find(Box).length).toEqual(1)
  expect(component.find(Select).length).toEqual(1)
  expect(component.find(FormLabel).length).toEqual(1)
})
