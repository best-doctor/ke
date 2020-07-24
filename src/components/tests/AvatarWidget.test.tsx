import * as React from 'react'
import { shallow } from 'enzyme'
import { Avatar, FormLabel } from '@chakra-ui/core'

import { AvatarWidget } from '../AvatarWidget'

test('Avatar widget properly rendered', () => {
  const component = shallow(<AvatarWidget name="test" helpText="test" style={{}} />)

  expect(component.find(Avatar).length).toEqual(1)
  expect(component.find(FormLabel).length).toEqual(1)
})
