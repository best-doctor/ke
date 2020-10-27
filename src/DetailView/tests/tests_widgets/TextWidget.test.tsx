import * as React from 'react'
import { shallow } from 'enzyme'
import { Text } from '@chakra-ui/core'

import { TextWidget, StyledTextWidget } from '../../widgets/TextWidget'
import { WidgetWrapper } from '../../../common/components/WidgetWrapper'
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
      mainDetailObject={detailObject}
      provider={testProvider}
      dataTarget={jest.fn()}
      dataSource={jest.fn()}
      targetPayload={jest.fn()}
      setMainDetailObject={jest.fn()}
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

  expect(component.find(WidgetWrapper).length).toEqual(1)
  expect(component.find(StyledTextWidget).length).toEqual(1)
  expect(component.find(Text).length).toEqual(1)
})
