import * as React from 'react'
import { shallow } from 'enzyme'

import { WidgetWrapper } from '../WidgetWrapper'
import { ForeignKeySelectWidget } from '../ForeignKeySelect'
import { AsyncSelectWidget } from '../AsyncSelectWidget'
import { testProvider, testNotifier } from '../../setupTests'

const detailObject = {
  id: 100500,
  last_name: 'test',
}

test('FK select widget properly rendered', () => {
  const component = shallow(
    <ForeignKeySelectWidget
      name="test"
      resource="test-resource"
      detailObject={detailObject}
      provider={testProvider}
      helpText="test"
      setObject={jest.fn()}
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
    />
  )

  expect(component.find(WidgetWrapper).length).toEqual(1)
  expect(component.find(AsyncSelectWidget).length).toEqual(1)
})
