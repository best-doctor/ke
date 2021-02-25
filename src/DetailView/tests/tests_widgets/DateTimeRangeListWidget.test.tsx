import React from 'react'
import { ThemeProvider } from '@chakra-ui/core'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import { WidgetWrapper } from '../../../common/components/WidgetWrapper'
import { DateTimeRangeListWidget, StyledDateTimeRangeListContainer } from '../../widgets/DateTimeRangeListWidget'
import { testProvider, testNotifier, mockedEffectorContainerStore } from '../../../setupTests'
import { BaseDateTimeRangeWidget } from '../../../common/components/BaseDateTimeRangeWidget'

const submitChangeMock = jest.fn()

const detailObject = {
  id: 100500,
  last_name: 'test',
  url: 'https://test.com',
}

const getComponent = (): JSX.Element => (
  <ThemeProvider>
    <DateTimeRangeListWidget
      name="test"
      resource="test-resource"
      analytics={undefined}
      widgetAnalytics={jest.fn()}
      helpText="test"
      mainDetailObject={detailObject}
      dataSource={jest.fn()}
      setMainDetailObject={jest.fn()}
      displayValue={() => [[new Date('2021-01-01T00:00:00'), new Date('2021-01-02T00:00:00')]]}
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
  </ThemeProvider>
)

test('DateTimeRangeListWidget properly rendered', () => {
  const component = mount(getComponent())

  expect(component.find(StyledDateTimeRangeListContainer).length).toEqual(1)
  expect(component.find(WidgetWrapper).length).toEqual(1)
})

test('DateTimeRangeListWidget properly handle event', () => {
  const component = mount(getComponent())

  act(() => {
    component.find(BaseDateTimeRangeWidget).first().props().handleChangeDate(new Date('2021-02-02T00:00:00'), 'end', 0)
  })

  expect(submitChangeMock).toHaveBeenCalledWith({
    url: 'https://some-test-target.com',
    payload: { testPayload: [['2021-01-01T00:00:00', '2021-02-02T00:00:00']] },
  })
})
