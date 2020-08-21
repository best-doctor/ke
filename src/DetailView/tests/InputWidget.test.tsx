import * as React from 'react'
import { shallow } from 'enzyme'
import { DebounceInput } from 'react-debounce-input'

import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { InputWidget } from '../widgets/InputWidget'
import { testProvider, testNotifier } from '../../setupTests'

const detailObject = {
  id: 100500,
  last_name: 'test',
}

test('Input widget properly rendered', () => {
  const component = shallow(
    <InputWidget
      name="test"
      resource="test-resource"
      analytics={undefined}
      widgetAnalytics={jest.fn()}
      helpText="test"
      detailObject={detailObject}
      setObject={jest.fn()}
      displayValue="test"
      dataTarget="test"
      targetPayload="test"
      notifier={testNotifier}
      provider={testProvider}
      viewType="test_view"
      style={{}}
      setInitialValue={jest.fn()}
      submitChange={jest.fn()}
    />
  )

  expect(component.find(DebounceInput).length).toEqual(1)
  expect(component.find(WidgetWrapper).length).toEqual(1)
})
