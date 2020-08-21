import * as React from 'react'
import { shallow } from 'enzyme'

import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { ForeignKeySelectWidget } from '../widgets/ForeignKeySelect'
import { AsyncSelectWidget } from '../../common/components/AsyncSelectWidget'
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
      setInitialValue={jest.fn()}
      submitChange={jest.fn()}
    />
  )

  expect(component.find(WidgetWrapper).length).toEqual(1)
  expect(component.find(AsyncSelectWidget).length).toEqual(1)
})
