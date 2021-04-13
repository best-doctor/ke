import React from 'react'
import { shallow, mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import { AsyncSelectWidget } from '../../../common/components/AsyncSelectWidget'
import { WidgetWrapper } from '../../../common/components/WidgetWrapper'
import { MultiSelectWidget } from '../../widgets/MultiSelectWidget'
import { testProvider, testNotifier, mockedEffectorContainerStore } from '../../../setupTests'

const submitChangeMock = jest.fn()

const detailObject = {
  id: 100500,
  last_name: 'test',
  url: 'https://test.com',
}

const getComponent = (): JSX.Element => (
  <MultiSelectWidget
    name="test"
    resource="test-resource"
    dataSource="test-source"
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
  />
)

test('Multiselect widget properly rendered', () => {
  const component = shallow(getComponent())

  expect(component.find(AsyncSelectWidget).length).toEqual(1)
  expect(component.find(WidgetWrapper).length).toEqual(1)
})

test('Submit user multiselect change', () => {
  const component = mount(getComponent())
  const value = [detailObject]

  act(() => (component.find('AsyncSelectWidget').props() as { handleChange: Function }).handleChange(value))

  expect(submitChangeMock).toHaveBeenCalledWith({ url: 'test', payload: { testPayload: [detailObject] } })
})
