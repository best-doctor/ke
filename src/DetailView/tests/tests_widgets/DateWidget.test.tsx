import React from 'react'
import { mount, shallow } from 'enzyme'
import { act } from 'react-dom/test-utils'
import DatePicker from 'react-datepicker'

import { DateInput } from '../../../django-spa/Controls'
import { WidgetWrapper } from '../../../common/components/WidgetWrapper'
import { DateWidget, DateWidgetProps } from '../../widgets/DateWidget'
import { testProvider, testNotifier, mockedEffectorContainerStore } from '../../../setupTests'

const submitChangeMock = jest.fn()

const detailObject = {
  id: 100500,
  last_name: 'test',
  url: 'https://test.com',
}

const getComponent = (props?: Partial<DateWidgetProps>): JSX.Element => (
  <DateWidget
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
    {...props}
  />
)

test('DateTimeWidget properly rendered', () => {
  const component = shallow(getComponent())

  expect(component.find(DateInput).length).toEqual(1)
  expect(component.find(WidgetWrapper).length).toEqual(1)
})

test('DateTimeWidget properly handle event', () => {
  const component = mount(getComponent())

  act(() => {
    component.find(DatePicker).first().props().onChange(new Date('2021-01-02T00:00:00'), undefined)
  })

  expect(submitChangeMock).toHaveBeenCalledWith({
    url: 'https://some-test-target.com',
    payload: { testPayload: '2021-01-02' },
  })
})

test('DateTimeWidget should pass dateFormat into DatePicker', () => {
  const component = mount(
    <DateWidget
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
      dateFormat="yyyy.MM.dd"
    />
  )

  expect(component.find(DatePicker).first().props().dateFormat).toBe('yyyy.MM.dd')
})

test('DateWidget widget should be rendered with name test id', () => {
  const component = mount(getComponent({ name: 'test' }))

  expect(component.find(WidgetWrapper).prop('data-test-id')).toEqual('test')
})

test('DateWidget widget should be rendered with wizard-name test id', () => {
  const component = mount(getComponent({ name: 'test', wizardName: 'wizard' }))

  expect(component.find(WidgetWrapper).prop('data-test-id')).toEqual('wizard-test')
})

test('DateWidget widget should be rendered with wizard-step-name test id', () => {
  const component = mount(getComponent({ name: 'test', wizardName: 'wizard', stepName: 'step' }))

  expect(component.find(WidgetWrapper).prop('data-test-id')).toEqual('wizard-step-test')
})

test('DateWidget widget should be rendered with step-name test id', () => {
  const component = mount(getComponent({ name: 'test', stepName: 'step' }))

  expect(component.find(WidgetWrapper).prop('data-test-id')).toEqual('step-test')
})
