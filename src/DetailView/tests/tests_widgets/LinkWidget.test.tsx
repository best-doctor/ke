import React from 'react'
import { shallow } from 'enzyme'
import { Link } from '@chakra-ui/react'

import { StyledWidgetWrapper } from '../../../common/components/WidgetWrapper'
import { LinkWidget, LinkWidgetProps } from '../../widgets/LinkWidget'
import { mockedEffectorContainerStore, testProvider, testNotifier } from '../../../setupTests'

const detailObject = {
  id: 100500,
  last_name: 'test',
}

const getComponent = (props?: Partial<LinkWidgetProps>): JSX.Element => (
  <LinkWidget
    name="test"
    resource="test-resource"
    analytics={undefined}
    widgetAnalytics={jest.fn()}
    mainDetailObject={detailObject}
    href="http://test.com"
    displayValue={jest.fn()}
    helpText="test"
    viewType="test_view"
    style={{}}
    containerStore={mockedEffectorContainerStore}
    provider={testProvider}
    dataTarget={jest.fn()}
    dataSource={jest.fn()}
    targetPayload={jest.fn()}
    setMainDetailObject={jest.fn()}
    notifier={testNotifier}
    setInitialValue={jest.fn()}
    submitChange={jest.fn()}
    {...props}
  />
)

test('Link widget properly rendered', () => {
  const component = shallow(getComponent())

  expect(component.find(Link).length).toEqual(1)
  expect(component.find(StyledWidgetWrapper).length).toEqual(1)
})

test('Input widget should be rendered with name test id', () => {
  const component = shallow(getComponent({ name: 'test' }))

  expect(component.find(StyledWidgetWrapper).prop('data-test-id')).toEqual('test')
})

test('Input widget should be rendered with wizard-name test id', () => {
  const component = shallow(getComponent({ name: 'test', wizardName: 'wizard' }))

  expect(component.find(StyledWidgetWrapper).prop('data-test-id')).toEqual('wizard-test')
})

test('Input widget should be rendered with wizard-step-name test id', () => {
  const component = shallow(getComponent({ name: 'test', wizardName: 'wizard', stepName: 'step' }))

  expect(component.find(StyledWidgetWrapper).prop('data-test-id')).toEqual('wizard-step-test')
})

test('Input widget should be rendered with step-name test id', () => {
  const component = shallow(getComponent({ name: 'test', stepName: 'step' }))

  expect(component.find(StyledWidgetWrapper).prop('data-test-id')).toEqual('step-test')
})
