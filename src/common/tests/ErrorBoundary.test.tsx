import React from 'react'
import { shallow } from 'enzyme'
import { Heading } from '@chakra-ui/react'

import { ErrorBoundary } from '../components/ErrorBoundary'

test('Component properly rendered', () => {
  const component = shallow(
    <ErrorBoundary>
      <h1>Header</h1>
    </ErrorBoundary>
  )
  expect(component.find('h1').length).toEqual(1)
  expect(component.containsMatchingElement(<h1>Header</h1>)).toEqual(true)
})

test('Error properly rendered', () => {
  const ChildrenComponent = (): null => null
  const component = shallow(
    <ErrorBoundary>
      <ChildrenComponent />
    </ErrorBoundary>
  )
  const error = new Error('Test error')
  component.find(ChildrenComponent).simulateError(error)

  expect(component.containsMatchingElement(<ChildrenComponent />)).toEqual(false)
  expect(
    component.containsMatchingElement(
      <Heading as="h4" size="md">
        Что-то пошло не так.
      </Heading>
    )
  ).toEqual(true)
  expect(
    component.containsMatchingElement(
      <Heading as="h5" size="sm">
        Error: Test error
      </Heading>
    )
  ).toEqual(true)
})
