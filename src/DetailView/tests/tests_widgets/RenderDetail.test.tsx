import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import { testAdmin, testProvider } from '../../../setupTests'
import { RenderDetail } from '../../RenderDetail'

test('Render detail mount', () => {
  jest.spyOn(React, 'useEffect').mockImplementation(() => ({ data: { patient: { last_name: 'Test' } } }))

  const component = mount(
    <MemoryRouter initialEntries={['/test/']}>
      <ChakraProvider>
        <RenderDetail resourceName="test" admin={testAdmin} provider={testProvider} user={{}} analytics={undefined} />
      </ChakraProvider>
    </MemoryRouter>
  )

  expect(component.find('ArrowLeft').length).toEqual(1)
})
