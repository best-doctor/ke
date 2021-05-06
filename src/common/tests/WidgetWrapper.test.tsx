import React from 'react'
import { shallow } from 'enzyme'
import { Flex, Box } from '@chakra-ui/core'

import { WidgetWrapper } from '../components/WidgetWrapper'

test('Widget wrapper properly rendered', () => {
  const component = shallow(
    <WidgetWrapper style={{}} helpText="test">
      <h1>Test</h1>
    </WidgetWrapper>
  )

  expect(component.find(Box).length).toEqual(2)
  expect(component.find('h1').length).toEqual(1)
  expect(component.find(Flex).length).toEqual(1)
})
