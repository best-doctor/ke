import * as React from 'react'
import { shallow } from 'enzyme'
import { FormLabel, Box, Text } from '@chakra-ui/core'

import { TextWidget } from '../widgets/TextWidget'

const detailObject = {
  test: {
    name: 'test',
  },
}

test('Text widget properly rendered', () => {
  const component = shallow(
    <TextWidget name="test.name" helpText="test" style={{}} displayValue={undefined} detailObject={detailObject} />
  )

  expect(component.find(Box).length).toEqual(1)
  expect(component.find(Text).length).toEqual(1)
  expect(component.find(FormLabel).length).toEqual(1)
})
