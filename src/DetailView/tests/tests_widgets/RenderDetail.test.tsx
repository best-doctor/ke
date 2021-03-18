import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@chakra-ui/core'

import { testAdmin, testProvider } from '../../../setupTests'
import { RenderDetail } from '../../RenderDetail'

test('Render detail mount', () => {
  jest.spyOn(React, 'useEffect').mockImplementation(() => ({ data: { patient: { last_name: 'Test' } } }))

  const component = mount(
    <MemoryRouter initialEntries={['/test/']}>
      <ThemeProvider>
        <RenderDetail resourceName="test" admin={testAdmin} provider={testProvider} user={{}} analytics={undefined} />
      </ThemeProvider>
    </MemoryRouter>
  )

  expect(component.find('FiArrowLeft').length).toEqual(1)
})
