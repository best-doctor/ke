import React from 'react'
import { ChakraProvider, Button as ChakraButton } from '@chakra-ui/react'
import { mount } from 'enzyme'

import { Button } from './Button'
import { waitForComponentToPaint } from '../../../../setupTests'

const getComponent = (onClick: () => void, isDisabled?: boolean): JSX.Element => (
  <ChakraProvider>
    <Button isDisabled={isDisabled} onClick={onClick}>
      Test button
    </Button>
  </ChakraProvider>
)

test('Button is rendered properly', () => {
  const button = mount(getComponent(jest.fn()))

  waitForComponentToPaint(button)

  expect(button.find(ChakraButton).length).toEqual(1)
})

test('Button is not disabled by default', () => {
  const button = mount(getComponent(jest.fn()))

  waitForComponentToPaint(button)

  expect(button.find(ChakraButton).props().isDisabled).toEqual(false)
})

test('Button is disabled is passed from props', () => {
  const button = mount(getComponent(jest.fn(), true))

  waitForComponentToPaint(button)

  expect(button.find(ChakraButton).props().isDisabled).toEqual(true)
})

test('Button is disabled during promise', async () => {
  jest.useFakeTimers()
  const mockedOnClick = jest.fn() as () => void
  const button = mount(getComponent(() => setInterval((): void => mockedOnClick(), 1000)))
  waitForComponentToPaint(button)

  button.find(ChakraButton).simulate('click')

  expect(button.find(ChakraButton).props().isDisabled).toEqual(true)
  jest.advanceTimersByTime(1001)
  await new Promise((res) => process.nextTick(res))
  button.update()
  expect(mockedOnClick).toBeCalledTimes(1)
  expect(button.find(ChakraButton).props().isDisabled).toEqual(false)
})
