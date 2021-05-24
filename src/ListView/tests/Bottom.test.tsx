import React from 'react'
import { mount } from 'enzyme'
import { mocked } from 'ts-jest/utils'
import { ChakraProvider } from '@chakra-ui/react'

import { pushAnalytics } from '../../integration/analytics/utils'

import { Bottom } from '../components/Table/Bottom'

afterEach(() => {
  jest.clearAllMocks()
})

jest.mock('../../integration/analytics/utils')

const pushAnalyticsMock = mocked(pushAnalytics)

test.each([[0], [1], [2], [3]])('Table bottom component', (buttonIndex) => {
  const analytics = undefined
  const resourceName = 'test'
  const pageIndex = 100500
  const canPreviousPage = true
  const canNextPage = true
  const pageOptions = [100500]
  const pageCount = 100500
  const gotoPage = jest.fn()
  const nextPage = jest.fn()
  const previousPage = jest.fn()

  const component = mount(
    <ChakraProvider>
      <Bottom
        analytics={analytics}
        pageIndex={pageIndex}
        resourceName={resourceName}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageCount={pageCount}
        pageOptions={pageOptions}
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </ChakraProvider>
  )
  component.find('button').get(buttonIndex).props.onClick()

  expect(pushAnalyticsMock.mock.calls.length).toBe(1)
})
