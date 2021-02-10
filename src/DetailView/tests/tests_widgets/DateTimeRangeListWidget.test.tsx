import * as React from 'react'
import { shallow } from 'enzyme'

import { WidgetWrapper } from '../../../common/components/WidgetWrapper'
import {
  DateTimeRangeListWidget,
  StyledDateTimeRangeListContainer
} from '../../widgets/DateTimeRangeListWidget'
import { testProvider, testNotifier, mockedEffectorContainerStore } from '../../../setupTests'


const submitChangeMock = jest.fn()

const detailObject = {
  id: 100500,
  last_name: 'test',
  url: 'https://test.com',
  test: [["2021-01-01","2021-01-02"]]
}

const getComponent = (): JSX.Element => (
  <DateTimeRangeListWidget
    name="test"
    resource="test-resource"
    analytics={undefined}
    widgetAnalytics={jest.fn()}
    helpText="test"
    mainDetailObject={detailObject}
    dataSource={jest.fn()}
    setMainDetailObject={jest.fn()}
    displayValue={undefined}
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

  expect(component.find(StyledDateTimeRangeListContainer).length).toEqual(1)
  expect(component.find(WidgetWrapper).length).toEqual(1)
})
