/* eslint-disable react/jsx-props-no-spreading */
/* Это legacy */
import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { ChakraProvider } from '@chakra-ui/react'

import { WidgetWrapper } from '../../../common/components/WidgetWrapper'
import { DateTimeRangeWidget } from '../../widgets/DateTimeRangeWidget'
import { testProvider, testNotifier, mockedEffectorContainerStore } from '../../../setupTests'
import { BaseDateTimeRangeWidget } from '../../../common/components/BaseDateTimeRangeWidget'
import { DateTimeRangeWidgetProps } from '../../widgets/DateTimeRangeListWidget'

const submitChangeMock = jest.fn()

const detailObject = {
  id: 100500,
  last_name: 'test',
  url: 'https://test.com',
}

const getComponent = (props?: Partial<DateTimeRangeWidgetProps>): JSX.Element => (
  <ChakraProvider>
    <DateTimeRangeWidget
      name="test"
      resource="test-resource"
      analytics={undefined}
      widgetAnalytics={jest.fn()}
      helpText="test"
      mainDetailObject={detailObject}
      dataSource={jest.fn()}
      setMainDetailObject={jest.fn()}
      displayValue={() => ['2021-01-01T00:00:00', '2021-01-02T00:00:00']}
      dataTarget="https://some-test-target.com"
      targetPayload={(value: string) => ({ testPayload: value })}
      notifier={testNotifier}
      provider={testProvider}
      viewType="test_view"
      style={{}}
      setInitialValue={jest.fn()}
      submitChange={submitChangeMock}
      containerStore={mockedEffectorContainerStore}
      {...props}
    />
  </ChakraProvider>
)

test('DateTimeRangeWidget properly rendered', () => {
  const component = mount(getComponent())

  expect(component.find(BaseDateTimeRangeWidget).length).toEqual(1)
  expect(component.find(WidgetWrapper).length).toEqual(1)
})

test('DateTimeRangeWidget properly handle event', () => {
  const component = mount(getComponent())

  act(() => {
    component
      .find(BaseDateTimeRangeWidget)
      .first()
      .props()
      .handleChangeDate(new Date('2021-02-02T00:00:00'), 'end', true)
  })

  expect(submitChangeMock).toHaveBeenCalledWith({
    url: 'https://some-test-target.com',
    payload: { testPayload: ['2021-01-01T00:00:00', '2021-02-02T00:00:00'] },
  })
})

test('DateTimeRangeWidget widget should be rendered with name test id', () => {
  const component = mount(getComponent({ name: 'test' }))

  expect(component.find(WidgetWrapper).prop('data-test-id')).toEqual('test')
})
