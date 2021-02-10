import * as React from 'react'
import { shallow } from 'enzyme'

import { WidgetWrapper } from '../../../common/components/WidgetWrapper'
import { DateTimeRangeWidget } from '../../widgets/DateTimeRangeWidget'
import { testProvider, testNotifier, mockedEffectorContainerStore } from '../../../setupTests'
import { BaseDateTimeRangeWidget } from '../../../common/components/BaseDateTimeRangeWidget'

const submitChangeMock = jest.fn()

const detailObject = {
  id: 100500,
  last_name: 'test',
  url: 'https://test.com',
}

const getComponent = (): JSX.Element => (
  <DateTimeRangeWidget
    name="test"
    resource="test-resource"
    analytics={undefined}
    widgetAnalytics={jest.fn()}
    helpText="test"
    mainDetailObject={detailObject}
    dataSource={jest.fn()}
    setMainDetailObject={jest.fn()}
    displayValue="2021-01-01"
    dataTarget="https://some-test-target.com"
    targetPayload={(value: string) => ({ testPayload: value })}
    notifier={testNotifier}
    provider={testProvider}
    viewType="test_view"
    style={{}}
    setInitialValue={jest.fn()}
    submitChange={submitChangeMock}
    containerStore={mockedEffectorContainerStore}
  />
)

test('DateTimeRangeWidget properly rendered', () => {
  const component = shallow(getComponent())

  expect(component.find(BaseDateTimeRangeWidget).length).toEqual(1)
  expect(component.find(WidgetWrapper).length).toEqual(1)
})
