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
        <RenderList admin={testAdmin} provider={testProvider} user={undefined} />
      </ThemeProvider>
    </MemoryRouter>
  )

  expect(component.find('Table').length).toEqual(1)
})
