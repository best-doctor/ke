import * as React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@chakra-ui/core'

import { testAdmin, testProvider } from '../../setupTests'
import { RenderList } from '../RenderList'

test('Render list mount', () => {
  jest.spyOn(React, 'useEffect').mockImplementation(() => {
    return { data: { patient: { last_name: 'Test' } } }
  })

  const component = mount(
    <MemoryRouter initialEntries={['/test/']}>
      <ThemeProvider>
        <RenderList admin={testAdmin} provider={testProvider} />
      </ThemeProvider>
    </MemoryRouter>
  )

  expect(component.find('SideBar').length).toEqual(1)
  expect(component.find('Table').length).toEqual(1)
})
