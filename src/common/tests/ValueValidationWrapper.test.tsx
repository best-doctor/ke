import React from 'react'
import { shallow } from 'enzyme'

import { ValueValidationWrapper } from '../components/ValueValidationWrapper'
import { testProvider } from '../../setupTests'
import { MessagesBlock } from '../components/MessagesBlock'

test('Value validation wrapper properly rendered', () => {
  const component = shallow(
    <ValueValidationWrapper
      blockingValidators={[]}
      notBlockingValidators={[]}
      detailObject={{}}
      provider={testProvider}
      value="test"
    >
      <></>
    </ValueValidationWrapper>
  )

  expect(component.find(MessagesBlock).length).toEqual(2)
})
