// Это легаси
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import { AsyncSelectWidget } from '../../../common/components/AsyncSelectWidget'
import { WidgetWrapper } from '../../../common/components/WidgetWrapper'
import { MultiSelectWidget, MultiSelectWidgetProps } from '../../widgets/MultiSelectWidget'
import { testProvider, testNotifier, mockedEffectorContainerStore } from '../../../setupTests'
import { ResourceProvider } from '../../../data-provider'

const submitChangeMock = jest.fn()

const detailObject = {
  id: 100500,
  last_name: 'test',
  url: 'https://test.com',
}

const getComponent = (partial?: Partial<MultiSelectWidgetProps>): JSX.Element => (
  <ResourceProvider>
    <MultiSelectWidget
      name="test"
      resource="test-resource"
      dataSource="http://test.com/test-source"
      helpText="test"
      mainDetailObject={detailObject}
      setMainDetailObject={jest.fn()}
      dataTarget="test"
      targetPayload={(value: string[]) => ({ testPayload: value })}
      notifier={testNotifier}
      provider={testProvider}
      viewType="test_view"
      style={{}}
      optionLabel={jest.fn()}
      optionValue={jest.fn()}
      setInitialValue={jest.fn()}
      submitChange={submitChangeMock}
      containerStore={mockedEffectorContainerStore}
      {...partial}
    />
  </ResourceProvider>
)

test('Multiselect widget properly rendered', () => {
  const component = mount(getComponent())

  expect(component.find(AsyncSelectWidget).length).toEqual(1)
  expect(component.find(WidgetWrapper).length).toEqual(1)
})

test('Submit user multiselect change', () => {
  const component = mount(getComponent())
  const value = [detailObject]

  act(() => (component.find('AsyncSelectWidget').props() as { handleChange: Function }).handleChange(value))

  expect(submitChangeMock).toHaveBeenCalledWith({ url: 'test', payload: { testPayload: [detailObject] } })
})

test('Multiselect widget should be rendered with name test id', () => {
  const component = mount(getComponent({ name: 'test' }))

  expect(component.find(WidgetWrapper).prop('data-test-id')).toEqual('test')
})
