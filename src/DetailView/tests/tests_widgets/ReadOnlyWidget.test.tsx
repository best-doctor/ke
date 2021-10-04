import React from 'react'
import { shallow } from 'enzyme'
import { ReadOnlyWidget, ReadOnlyWidgetProps } from '../../widgets/ReadOnlyWidget'
import { StyledWidgetWrapper } from '../../../common/components/WidgetWrapper'
import { testProvider, testNotifier, mockedEffectorContainerStore } from '../../../setupTests'
import { EmptyText } from '../../../common/components/EmptyText'

const detailObject = {
  test: {
    name: 'test',
  },
}

const getComponent = (props?: Partial<ReadOnlyWidgetProps>): JSX.Element => (
  <ReadOnlyWidget
    name="test.name"
    helpText="test"
    style={{}}
    displayValue={undefined}
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
    {...props}
  />
)

test('Read only widget properly rendered', () => {
  const component = shallow(getComponent())

  expect(component.find(StyledWidgetWrapper).length).toEqual(1)
  expect(component.find(EmptyText).length).toEqual(1)
})

test('Read only widget should be rendered with name test id', () => {
  const component = shallow(getComponent({ name: 'test' }))

  expect(component.find(StyledWidgetWrapper).prop('data-test-id')).toEqual('test')
})

test('Read only widget should be rendered with wizard-name test id', () => {
  const component = shallow(getComponent({ name: 'test', wizardName: 'wizard' }))

  expect(component.find(StyledWidgetWrapper).prop('data-test-id')).toEqual('wizard-test')
})

test('Read only widget should be rendered with wizard-step-name test id', () => {
  const component = shallow(getComponent({ name: 'test', wizardName: 'wizard', stepName: 'step' }))

  expect(component.find(StyledWidgetWrapper).prop('data-test-id')).toEqual('wizard-step-test')
})

test('Read only widget should be rendered with step-name test id', () => {
  const component = shallow(getComponent({ name: 'test', stepName: 'step' }))

  expect(component.find(StyledWidgetWrapper).prop('data-test-id')).toEqual('step-test')
})
