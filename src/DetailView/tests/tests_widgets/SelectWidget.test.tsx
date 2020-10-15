import * as React from 'react'
import { mount } from 'enzyme'
import { Select, ThemeProvider } from '@chakra-ui/core'
import { act } from 'react-dom/test-utils'

import { WidgetWrapper } from '../../../common/components/WidgetWrapper'
import { SelectWidget } from '../../widgets/SelectWidget'
import { testProvider, testNotifier, mockedEffectorContainerStore } from '../../../setupTests'

const detailObject = {
  id: 100500,
  last_name: 'test',
  status: {
    value: 'success',
    text: 'Success',
  },
}

const submitChangeMock = jest.fn()

const getComponent = (): JSX.Element => (
  <ThemeProvider>
    <SelectWidget
      name="status.text"
      resource="test-resource"
      analytics={undefined}
      widgetAnalytics={jest.fn()}
      helpText="test"
      displayValue={undefined}
      mainDetailObject={detailObject}
      dataSource={jest.fn()}
      dataTarget="https://test.com"
      targetPayload={(value: string) => ({ testPayload: value })}
      setMainDetailObject={jest.fn()}
      provider={testProvider}
      style={{}}
      viewType="test_view"
      notifier={testNotifier}
      setInitialValue={jest.fn()}
      submitChange={submitChangeMock}
      containerStore={mockedEffectorContainerStore}
    />
  </ThemeProvider>
)

test('Select widget properly rendered', () => {
  const component = mount(getComponent())

  expect(component.find(Select).length).toEqual(1)
  expect(component.find(WidgetWrapper).length).toEqual(1)
})

test('User change select', () => {
  const widget = getComponent()
  const component = mount(widget)
  const value = { target: { value: 'some_value' } }

  act(() => (component.find('Select').props() as { onChange: Function }).onChange(value))

  expect(submitChangeMock).toHaveBeenCalledWith({ url: 'https://test.com', payload: { testPayload: 'some_value' } })
})
