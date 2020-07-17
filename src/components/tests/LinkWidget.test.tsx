import * as React from 'react'
import { shallow } from 'enzyme'
import { FormLabel, Link } from '@chakra-ui/core'

import { LinkWidget } from '../LinkWidget'

const detailObject = {
  id: 100500,
  last_name: 'test',
}

test('Link widget properly rendered', () => {
  const component = shallow(
    <LinkWidget
      name='test'
      detailObject={detailObject}
      href='http://test.com'
      displayValue={jest.fn()}
      helpText='test'
      style={{}}
    />
  )

  expect(component.find(Link).length).toEqual(1)
  expect(component.find(FormLabel).length).toEqual(1)
})