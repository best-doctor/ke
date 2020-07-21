import * as React from 'react'
import { shallow } from 'enzyme'
import { DebounceInput } from 'react-debounce-input'
import { FormLabel } from '@chakra-ui/core'

import { InputWidget } from '../InputWidget'
import { testProvider } from '../../setupTests'

const detailObject = {
  id: 100500,
  last_name: 'test',
}

test('Input widget properly rendered', () => {
  const component = shallow(
    <InputWidget
      name="test"
      helpText="test"
      detailObject={detailObject}
      setObject={jest.fn()}
      displayValue="test"
      dataTarget="test"
      targetPayload="test"
      notifier={jest.fn()}
      provider={testProvider}
      style={{}}
    />
  )

  expect(component.find(DebounceInput).length).toEqual(1)
  expect(component.find(FormLabel).length).toEqual(1)
})
