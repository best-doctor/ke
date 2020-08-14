import * as React from 'react'
import { shallow } from 'enzyme'
import { Select } from '@chakra-ui/core'

import { WidgetWrapper } from '../WidgetWrapper'
import { SelectWidget } from '../SelectWidget'
import { testProvider, testNotifier } from '../../setupTests'

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
      resource="test-resource"
      analytics={undefined}
      widgetAnalytics={jest.fn()}
      helpText="test"
      displayValue={undefined}
      detailObject={detailObject}
      dataSource={jest.fn()}
      dataTarget={jest.fn()}
      targetPayload={jest.fn()}
      setObject={jest.fn()}
      provider={testProvider}
      style={{}}
      viewType="test_view"
      notifier={testNotifier}
    />
  )

  expect(component.find(Select).length).toEqual(1)
  expect(component.find(WidgetWrapper).length).toEqual(1)
})
