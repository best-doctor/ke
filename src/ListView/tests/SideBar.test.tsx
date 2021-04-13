import React from 'react'
import { shallow, mount } from 'enzyme'
import { mocked } from 'ts-jest/utils'
import { Menu } from 'react-feather'
import { Drawer, DrawerContent, ThemeProvider } from '@chakra-ui/core'

import { SideBar, SideBarElement } from '../components/SideBar'
import { AdminResource } from '../../ResourceComposer'
import { goToResourceEvent } from '../events'
import { testAdmin, testProvider } from '../../setupTests'

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
  useLocation: () => ({
    pathname: 'localhost:0000/appeals/',
  }),
}))

jest.mock('../events')

const goToResourceEventMock = mocked(goToResourceEvent)

const testResource = (
  <AdminResource name="test-resource" admin={testAdmin} provider={testProvider} user={{}} analytics={undefined} />
)

const getSideBarElement = (): JSX.Element => (
  <ThemeProvider>
    <SideBarElement resource={testResource} />
  </ThemeProvider>
)

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

test('Side bar element component properly rendered', () => {
  const component = mount(getSideBarElement())

  expect(component.find('Button').length).toBe(1)
})

test('Side bar element component on click handle', () => {
  const component = mount(getSideBarElement())

  ;(component.find('Button').props() as { onClick: Function }).onClick()

  expect(goToResourceEventMock.mock.calls.length).toBe(1)
})
