import * as React from 'react'
import { shallow } from 'enzyme'
import { FormLabel, Box } from '@chakra-ui/core'

import { WidgetWrapper } from '../WidgetWrapper'

test('Widget wrapper properly rendered', () => {
  const component = shallow(
    <WidgetWrapper style={{}} helpText="test">
      <h1>Test</h1>
    </WidgetWrapper>
  )

  expect(component.find(Box).length).toEqual(1)
  expect(component.find('h1').length).toEqual(1)
  expect(component.find(FormLabel).length).toEqual(1)
})
