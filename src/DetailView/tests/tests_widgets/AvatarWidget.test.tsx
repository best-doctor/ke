import React from 'react'
import { shallow } from 'enzyme'
import { Avatar } from '@chakra-ui/core'

import { WidgetWrapper } from '../../../common/components/WidgetWrapper'
import { AvatarWidget } from '../../widgets/AvatarWidget'

test('Avatar widget properly rendered', () => {
  const component = shallow(<AvatarWidget name="test" helpText="test" style={{}} />)

  expect(component.find(Avatar).length).toEqual(1)
  expect(component.find(WidgetWrapper).length).toEqual(1)
})
