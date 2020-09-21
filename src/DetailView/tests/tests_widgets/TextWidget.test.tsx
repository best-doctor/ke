import * as React from 'react'
import { shallow } from 'enzyme'
import { FormLabel, Box, Text } from '@chakra-ui/core'

import { TextWidget } from '../../widgets/TextWidget'
import { testProvider, testNotifier, mockedEffectorContainerStore } from '../../../setupTests'

const detailObject = {
  test: {
    name: 'test',
  },
}

test('Text widget properly rendered', () => {
  const component = shallow(
    <TextWidget
      name="test.name"
      helpText="test"
      style={{}}
      displayValue={undefined}
      detailObject={detailObject}
      provider={testProvider}
      dataTarget={jest.fn()}
      dataSource={jest.fn()}
      targetPayload={jest.fn()}
      setObject={jest.fn()}
      notifier={testNotifier}
      setInitialValue={jest.fn()}
      submitChange={jest.fn()}
      viewType="test_view"
      widgetAnalytics={jest.fn()}
      resource="test-resource"
      analytics={undefined}
      containerStore={mockedEffectorContainerStore}
    />
  )

  expect(component.find(Box).length).toEqual(1)
  expect(component.find(Text).length).toEqual(1)
  expect(component.find(FormLabel).length).toEqual(1)
})
