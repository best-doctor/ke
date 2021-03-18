import React from 'react'
import { mount } from 'enzyme'

import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@chakra-ui/core'

import { testAdmin, testProvider, dataMockResponse, mockPagination } from '../../setupTests'
import { RenderList } from '../RenderList'

const getComponent = (): JSX.Element => (
  <MemoryRouter initialEntries={['/test/']}>
    <ThemeProvider>
      <RenderList
        resourceName="test"
        admin={testAdmin}
        provider={testProvider}
        user={undefined}
        analytics={undefined}
      />
    </ThemeProvider>
  </MemoryRouter>
)

test('Render list mount', () => {
  jest.spyOn(testProvider, 'getPage').mockImplementation(() => Promise.resolve([dataMockResponse, [], mockPagination]))

  const component = mount(getComponent())

  expect(component.find('Table').length).toEqual(1)
})
