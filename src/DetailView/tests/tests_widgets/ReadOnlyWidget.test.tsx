import React from 'react'
import { shallow } from 'enzyme'
import { ReadOnlyWidget } from '../../widgets/ReadOnlyWidget'
import { StyledWidgetWrapper } from '../../../common/components/WidgetWrapper'
import { testProvider, testNotifier, mockedEffectorContainerStore } from '../../../setupTests'
import { EmptyText } from '../../../common/components/EmptyText'

const detailObject = {
  test: {
    name: 'test',
  },
}

test('Read only widget properly rendered', () => {
  const component = shallow(
    <ReadOnlyWidget
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

  expect(component.find(StyledWidgetWrapper).length).toEqual(1)
  expect(component.find(EmptyText).length).toEqual(1)
})
