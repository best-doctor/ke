import * as React from 'react'
import { mocked } from 'ts-jest/utils'
import { mount } from 'enzyme'

import * as Sentry from '@sentry/react'

import { EnableSentry } from '../EnableSentry'

jest.mock('@sentry/react')

const mockedInit = mocked(Sentry.init)
const mockedConfigureScope = mocked(Sentry.configureScope)

test('Call sentry initialization', () => {
  const user = { email: 'test@test.com' }
  const sentryDSN = 'test-sentry-dsn'

  const component = mount(
    <EnableSentry
      sentryDSN={sentryDSN}
      user={user}
    />
  )

  expect(component.find('EnableSentry').length).toBe(1)
  expect(mockedInit.mock.calls.length).toBe(1)
  expect(mockedConfigureScope.mock.calls.length).toBe(1)
})
