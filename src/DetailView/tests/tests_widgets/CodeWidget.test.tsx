import React from 'react'
import { shallow } from 'enzyme'

import { CodeWidget, StyledCodeWidget } from '../../widgets/CodeWidget'
import { WidgetWrapper } from '../../../common/components/WidgetWrapper'
import { testProvider, testNotifier, mockedEffectorContainerStore } from '../../../setupTests'

const detailObject = {
  test: {
    name: 'test',
  },
}

test('Code widget properly rendered', () => {
  const component = shallow(
    <CodeWidget
      name="test.name"
      helpText="test"
      style={{}}
      displayValue={() => '<a href="/test.com">test</a>'}
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

  expect(component.find(WidgetWrapper).length).toEqual(1)
  expect(component.find(StyledCodeWidget).length).toEqual(1)
  expect(component.find('a').length).toEqual(1)
})

test('CodeWidget widget should be rendered with name test id', () => {
  const component = shallow(
    <CodeWidget
      name="test"
      helpText="test"
      style={{}}
      displayValue={() => '<a href="/test.com">test</a>'}
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

  expect(component.find(WidgetWrapper).prop('data-test-id')).toEqual('test')
})

test('CodeWidget widget should be rendered with wizard-name test id', () => {
  const component = shallow(
    <CodeWidget
      name="test"
      wizardName="wizard"
      helpText="test"
      style={{}}
      displayValue={() => '<a href="/test.com">test</a>'}
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

  expect(component.find(WidgetWrapper).prop('data-test-id')).toEqual('wizard-test')
})

test('CodeWidget widget should be rendered with wizard-step-name test id', () => {
  const component = shallow(
    <CodeWidget
      name="test"
      wizardName="wizard"
      stepName="step"
      helpText="test"
      style={{}}
      displayValue={() => '<a href="/test.com">test</a>'}
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

  expect(component.find(WidgetWrapper).prop('data-test-id')).toEqual('wizard-step-test')
})

test('CodeWidget widget should be rendered with wizard-step-name test id', () => {
  const component = shallow(
    <CodeWidget
      name="test"
      stepName="step"
      helpText="test"
      style={{}}
      displayValue={() => '<a href="/test.com">test</a>'}
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

  expect(component.find(WidgetWrapper).prop('data-test-id')).toEqual('step-test')
})
