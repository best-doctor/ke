import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import Select from 'react-select'

import { WidgetWrapper } from '../../../common/components/WidgetWrapper'
import { SelectWidget, BaseSelectWidget } from '../../widgets/SelectWidget'
import { testProvider, testNotifier, mockedEffectorContainerStore, waitForComponentToPaint } from '../../../setupTests'
import { BaseProvider } from '../../../admin/providers'
import { ThemeProvider } from '../../../styles'

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

const mockedProvider = { ...testProvider }
const getPageMock = (mockedProvider.getPage = jest.fn()).mockReturnValue(
  Promise.resolve([[{ text: 'some_text', value: 'some_value' }]])
)

mockedProvider.getPage = getPageMock

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
      provider={mockedProvider as BaseProvider}
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

test('Select widget properly rendered', async () => {
  const component = mount(getSelectWidgetComponent())

  await waitForComponentToPaint(component)
  expect(component.find(Select).length).toEqual(1)
  expect(component.find(WidgetWrapper).length).toEqual(1)
})

test('Select widget user change select', async () => {
  const widget = getSelectWidgetComponent()
  const component = mount(widget)
  const value = { value: 'some_value', label: 'Some value' }

  await waitForComponentToPaint(component)
  act(() => (component.find('Select').props() as { onChange: Function }).onChange(value))

  expect(submitChangeMock).toHaveBeenCalledWith({ url: 'https://test.com', payload: { testPayload: 'some_value' } })
})

test('Base select widget properly rendered', async () => {
  // jest.spyOn(React, 'useEffect').mockImplementation((f) => f())
  const component = mount(getBaseSelectWidgetComponent())
  await waitForComponentToPaint(component)
  expect(component.find(Select).length).toEqual(1)
  expect(component.find(WidgetWrapper).length).toEqual(1)
})

test('Base select widget user change select', async () => {
  const widget = getBaseSelectWidgetComponent()
  const component = mount(widget)
  await waitForComponentToPaint(component)
  const value = { value: 'some_value', label: 'Some value' }

  act(() => (component.find('Select').props() as { onChange: Function }).onChange(value))

  expect(handleChangeMock.mock.calls.length).toBe(1)
})
