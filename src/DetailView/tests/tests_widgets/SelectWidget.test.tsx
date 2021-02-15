import * as React from 'react'
import { mount } from 'enzyme'
import { Select, ThemeProvider } from '@chakra-ui/core'
import { act } from 'react-dom/test-utils'

import { WidgetWrapper } from '../../../common/components/WidgetWrapper'
import { SelectWidget, BaseSelectWidget } from '../../widgets/SelectWidget'
import { testProvider, testNotifier, mockedEffectorContainerStore } from '../../../setupTests'

const detailObject = {
  id: 100500,
  last_name: 'test',
  status: {
    value: 'success',
    text: 'Success',
  },
}

const options = [
  { value: 'value1', text: 'text1' },
  { value: 'value2', text: 'text2' },
  { value: 'value3', text: 'text3' },
]

const submitChangeMock = jest.fn()
const handleChangeMock = jest.fn()

const getSelectWidgetComponent = (): JSX.Element => (
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

const getBaseSelectWidgetComponent = (): JSX.Element => (
  <ThemeProvider>
    <BaseSelectWidget
      name="status.text"
      helpText="test"
      displayValue={undefined}
      mainDetailObject={detailObject}
      style={{}}
      setInitialValue={jest.fn()}
      handleChange={handleChangeMock}
      containerStore={mockedEffectorContainerStore}
      data={options}
    />
  </ThemeProvider>
)

test('Select widget properly rendered', () => {
  const component = mount(getSelectWidgetComponent())

  expect(component.find(Select).length).toEqual(1)
  expect(component.find(WidgetWrapper).length).toEqual(1)
})

test('Select widget user change select', () => {
  const widget = getSelectWidgetComponent()
  const component = mount(widget)
  const value = { target: { value: 'some_value' } }

  act(() => (component.find('Select').props() as { onChange: Function }).onChange(value))

  expect(submitChangeMock).toHaveBeenCalledWith({ url: 'https://test.com', payload: { testPayload: 'some_value' } })
})

test('Base select widget properly rendered', () => {
  jest.spyOn(React, 'useEffect').mockImplementation((f) => f())
  const component = mount(getBaseSelectWidgetComponent())

  expect(component.find(Select).length).toEqual(1)
  expect(component.find(WidgetWrapper).length).toEqual(1)
})

test('Base select widget user change select', () => {
  const widget = getBaseSelectWidgetComponent()
  const component = mount(widget)
  const value = { target: { value: 'some_value' } }

  act(() => (component.find('Select').props() as { onChange: Function }).onChange(value))

  expect(handleChangeMock.mock.calls.length).toBe(1)
})
