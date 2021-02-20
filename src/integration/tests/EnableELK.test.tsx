import React from 'react'
import { mocked } from 'ts-jest/utils'
import { mount } from 'enzyme'

import { init as initApm } from '@elastic/apm-rum'

import { EnableELK } from '../EnableELK'

jest.mock('@elastic/apm-rum')

const mockedInit = mocked(initApm)

test('Call elk apm initialization', () => {
  const serviceName = 'test-service'
  const serverUrl = 'https://service-url.com'
  const serviceVersion = '100500'

  const component = mount(<EnableELK serviceName={serviceName} serviceVersion={serviceVersion} serverUrl={serverUrl} />)

  expect(component.find('EnableELK').length).toBe(1)
  expect(mockedInit.mock.calls.length).toBe(1)
})
