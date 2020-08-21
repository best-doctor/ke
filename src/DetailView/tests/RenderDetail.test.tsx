import * as React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@chakra-ui/core'
import * as GridLayout from 'react-grid-layout'

import { testAdmin, testProvider } from '../../setupTests'
import { RenderDetail } from '../RenderDetail'

test('Render detail mount', () => {
  jest.spyOn(React, 'useEffect').mockImplementation(() => {
    return { data: { patient: { last_name: 'Test' } } }
  })

  const component = mount(
    <MemoryRouter initialEntries={['/test/']}>
      <ThemeProvider>
        <RenderDetail resourceName="test" admin={testAdmin} provider={testProvider} user={{}} analytics={undefined} />
      </ThemeProvider>
    </MemoryRouter>
  )

  expect(component.find(GridLayout).length).toEqual(1)
  expect(component.find('ArrowLeft').length).toEqual(1)
})
