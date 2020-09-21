import * as React from 'react'
import { shallow } from 'enzyme'
import { Link } from '@chakra-ui/core'

import { WidgetWrapper } from '../../../common/components/WidgetWrapper'
import { LinkWidget } from '../../widgets/LinkWidget'
import { mockedEffectorContainerStore, testProvider, testNotifier } from '../../../setupTests'

const detailObject = {
  id: 100500,
  last_name: 'test',
}

test('Link widget properly rendered', () => {
  const component = shallow(
    <LinkWidget
      name="test"
      resource="test-resource"
      analytics={undefined}
      widgetAnalytics={jest.fn()}
      detailObject={detailObject}
      href="http://test.com"
      displayValue={jest.fn()}
      helpText="test"
      viewType="test_view"
      style={{}}
      containerStore={mockedEffectorContainerStore}
      provider={testProvider}
      dataTarget={jest.fn()}
      dataSource={jest.fn()}
      targetPayload={jest.fn()}
      setObject={jest.fn()}
      notifier={testNotifier}
      setInitialValue={jest.fn()}
      submitChange={jest.fn()}
    />
  )

  expect(component.find(Link).length).toEqual(1)
  expect(component.find(WidgetWrapper).length).toEqual(1)
})
