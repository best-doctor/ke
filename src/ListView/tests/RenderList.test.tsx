import * as React from 'react'
import { mount } from 'enzyme'

import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@chakra-ui/core'

import { testAdmin, testProvider } from '../../setupTests'
import { RenderList } from '../RenderList'

const dataMockResponse = [{ id: '100500', test: 'key' }]

const mockPagination = {
  page: 100500,
  perPage: 100500,
  count: 100500,
  nextUrl: '',
  prevUrl: '',
}

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
  jest.spyOn(testProvider, 'getList').mockImplementation(() => {
    return Promise.resolve([dataMockResponse, [], mockPagination])
  })

  const component = mount(getComponent())

  expect(component.find('Table').length).toEqual(1)
})
