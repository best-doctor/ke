import React from 'react'
import { mount } from 'enzyme'

import { MemoryRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import { testAdmin, testProvider, dataMockResponse, mockPagination, waitForComponentToPaint } from '../../setupTests'
import { RenderList } from '../RenderList'

const getComponent = (): JSX.Element => (
  <MemoryRouter initialEntries={['/test/']}>
    <ChakraProvider>
      <RenderList
        resourceName="test"
        admin={testAdmin}
        provider={testProvider}
        user={undefined}
        analytics={undefined}
      />
    </ChakraProvider>
  </MemoryRouter>
)

test('Render list mount', () => {
  jest.spyOn(testProvider, 'getPage').mockImplementation(() => Promise.resolve([dataMockResponse, [], mockPagination]))

  const component = mount(getComponent())
  waitForComponentToPaint(component)

  expect(component?.find('Table').length).toEqual(1)
})
