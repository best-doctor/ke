import * as React from 'react'
import { shallow } from 'enzyme'
import { mocked } from 'ts-jest/utils'

import { FilterBlock } from '../components/Table/TableFiltersBlock'
import { pushAnalytics } from '../../integration/analytics/utils'

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}))

jest.mock('../../integration/analytics/utils')

const mockedPushAnalytics = mocked(pushAnalytics)

test('Table filter block', () => {
  const resourceName = 'test'
  const user = {}
  const analytics = undefined

  const component = shallow(
    <FilterBlock
      resourceName={resourceName}
      listFilters={[]}
      listFilterTemplates={[]}
      user={user}
      analytics={analytics}
    />
  )

  ;(component.find('#reset-filters').props() as { onClick: Function }).onClick()

  expect(mockedPushAnalytics.mock.calls.length).toBe(1)
})
