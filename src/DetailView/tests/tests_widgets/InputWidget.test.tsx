import React from 'react'
import { shallow, mount } from 'enzyme'
import { DebounceInput } from 'react-debounce-input'

import { WidgetWrapper } from '../../../common/components/WidgetWrapper'
import { InputWidget } from '../../widgets/InputWidget'
import { testProvider, testNotifier, mockedEffectorContainerStore } from '../../../setupTests'

const submitChangeMock = jest.fn()

const detailObject = {
  id: 100500,
  last_name: 'test',
  url: 'https://test.com',
}

const getComponent = (): JSX.Element => (
  <InputWidget
    name="test"
    resource="test-resource"
    analytics={undefined}
    widgetAnalytics={jest.fn()}
    helpText="test"
    mainDetailObject={detailObject}
    dataSource={jest.fn()}
    setMainDetailObject={jest.fn()}
    displayValue="test"
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

test('Input widget properly rendered', () => {
  const component = shallow(getComponent())

  expect(component.find(DebounceInput).length).toEqual(1)
  expect(component.find(WidgetWrapper).length).toEqual(1)
})

test('Submit user input', () => {
  const component = mount(getComponent())
  const event = { target: { value: 'sometext' } }

  ;(component.find(DebounceInput).props() as { onChange: Function }).onChange(event)

  expect(submitChangeMock).toHaveBeenCalledWith({
    url: 'https://some-test-target.com',
    payload: { testPayload: 'sometext' },
  })
})
