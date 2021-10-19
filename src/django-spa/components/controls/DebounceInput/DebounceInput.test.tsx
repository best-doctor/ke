import React from 'react'
import { fireEvent, render, RenderResult } from '@testing-library/react'

import { DebounceInput } from './DebounceInput'

beforeAll(() => {
  jest.useFakeTimers('modern')
})

afterAll(() => {
  jest.useRealTimers()
})

let onChangeMock = jest.fn()

beforeEach(() => {
  onChangeMock = jest.fn()
})

const getComponent = (value: string): RenderResult =>
  render(<DebounceInput value={value} onChange={onChangeMock} debounceTimeout={1000} data-testid="TestDebounceInput" />)

test('DebounceInput shows passed value', () => {
  const debounceInput = getComponent('test value')

  expect(debounceInput.getByTestId('TestDebounceInput').getAttribute('value')).toEqual('test value')
})

test('DebounceInput change calls onChange', () => {
  const debounceInput = getComponent('')

  fireEvent.change(debounceInput.getByTestId('TestDebounceInput'), { target: { value: 'new value' } })
  // jest.runAllTimers()
  jest.advanceTimersByTime(1001)

  expect(onChangeMock).toHaveBeenCalledWith('new value')
})

test('DebounceInput change does not call onChange before timeout passed', () => {
  const debounceInput = getComponent('')

  fireEvent.change(debounceInput.getByTestId('TestDebounceInput'), { target: { value: 'new value' } })
  jest.advanceTimersByTime(500)

  expect(onChangeMock).toBeCalledTimes(0)
})
