import * as React from 'react'
import { shallow } from 'enzyme'
import { Menu } from 'react-feather'
import { Drawer, DrawerContent } from '@chakra-ui/core'

import { SideBar } from '../components/SideBar'

test('Side bar component properly rendered', () => {
  const component = shallow(
    <SideBar header="Test">
      <h1>Test</h1>
      <h1>Test2</h1>
    </SideBar>
  )

  expect(component.find(Menu).length).toEqual(1)
  expect(component.find(Drawer).length).toEqual(1)
  expect(component.find(DrawerContent).length).toEqual(1)
  expect(component.find('h1').length).toEqual(2)
})
