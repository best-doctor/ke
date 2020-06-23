import * as React from 'react'
import { shallow } from 'enzyme'

import { testAdmin, testProvider } from '../../setupTests'
import { ResourceComposer, Resource } from '../index'
import { RenderList } from '../RenderList'
import { RenderDetail } from '../RenderDetail'

test('ResourceComposer mounts router with children', () => {
  const wrapper = shallow(
    <ResourceComposer>
      <h1>Test</h1>
      <h1>Test 2</h1>
    </ResourceComposer>
  )

  expect(wrapper.find('BrowserRouter').length).toEqual(1)
  expect(wrapper.find('h1').length).toEqual(2)
})

test('Resource mounts properly', () => {
  const wrapper = shallow(
    <Resource name="test" admin={testAdmin} provider={testProvider} additionalDetailComponents={[]} />
  )

  expect(wrapper.find('Switch').length).toEqual(1)
  expect(wrapper.find('Route').length).toEqual(2)
  expect(wrapper.find(RenderList).length).toEqual(1)
  expect(wrapper.find(RenderDetail).length).toEqual(1)
})
