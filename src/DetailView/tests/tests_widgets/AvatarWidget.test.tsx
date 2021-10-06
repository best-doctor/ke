import React from 'react'
import { shallow } from 'enzyme'
import { Avatar } from '@chakra-ui/react'

import { WidgetWrapper } from '../../../common/components/WidgetWrapper'
import { AvatarWidget } from '../../widgets/AvatarWidget'

test('Avatar widget properly rendered', () => {
  const component = shallow(<AvatarWidget name="test" helpText="test" style={{}} />)

  expect(component.find(Avatar).length).toEqual(1)
  expect(component.find(WidgetWrapper).length).toEqual(1)
})

test('Avatar widget should be rendered with name test id', () => {
  const component = shallow(<AvatarWidget name="test" helpText="test" style={{}} />)

  expect(component.find(WidgetWrapper).prop('data-test-id')).toEqual('test')
})

test('Avatar widget should be rendered with wizard-name test id', () => {
  const component = shallow(<AvatarWidget name="test" wizardName="wizard" helpText="test" style={{}} />)

  expect(component.find(WidgetWrapper).prop('data-test-id')).toEqual('wizard-test')
})

test('Avatar widget should be rendered with wizard-step-name test id', () => {
  const component = shallow(<AvatarWidget name="test" wizardName="wizard" stepName="step" helpText="test" style={{}} />)

  expect(component.find(WidgetWrapper).prop('data-test-id')).toEqual('wizard-step-test')
})

test('Avatar widget should be rendered with step-name test id', () => {
  const component = shallow(<AvatarWidget name="test" stepName="step" helpText="test" style={{}} />)

  expect(component.find(WidgetWrapper).prop('data-test-id')).toEqual('step-test')
})
