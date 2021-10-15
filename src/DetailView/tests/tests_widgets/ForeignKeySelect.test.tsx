import React from 'react'
import { shallow } from 'enzyme'

import { WidgetWrapper } from '../../../common/components/WidgetWrapper'
import { ForeignKeySelectWidget, ForeignKeySelectWidgetProps } from '../../widgets/ForeignKeySelect'
import { AsyncSelectWidget } from '../../../common/components/AsyncSelectWidget'
import { testProvider, testNotifier, mockedEffectorContainerStore } from '../../../setupTests'

const detailObject = {
  id: '100500',
  data: {
    last_name: 'test',
  },
}

const submitChangeMock = jest.fn()

const getComponent = (props?: Partial<ForeignKeySelectWidgetProps>): JSX.Element => (
  <ForeignKeySelectWidget
    name="data"
    resource="test-resource"
    mainDetailObject={detailObject}
    provider={testProvider}
    helpText="test"
    setMainDetailObject={jest.fn()}
    displayValue="test"
    dataSource="test"
    dataTarget="test"
    analytics={undefined}
    widgetAnalytics={jest.fn()}
    targetPayload={jest.fn()}
    optionLabel={jest.fn()}
    optionValue={jest.fn()}
    notifier={testNotifier}
    viewType="test_view"
    style={{}}
    setInitialValue={jest.fn()}
    submitChange={submitChangeMock}
    containerStore={mockedEffectorContainerStore}
    {...props}
  />
)

test('FK select widget properly rendered', () => {
  const component = shallow(getComponent())

  expect(component.find(WidgetWrapper).length).toEqual(1)
  expect(component.find(AsyncSelectWidget).length).toEqual(1)
})

test('FK select widget should be rendered with name test id', () => {
  const component = shallow(getComponent({ name: 'test' }))

  expect(component.find(WidgetWrapper).prop('data-test-id')).toEqual('test')
})
