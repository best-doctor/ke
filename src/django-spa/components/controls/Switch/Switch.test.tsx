import React from 'react'
import { render, RenderResult, fireEvent } from '@testing-library/react'

import { Switch } from './Switch'

const onChangeMock = jest.fn()

const getComponent = (value: boolean): RenderResult =>
  render(<Switch value={value} onChange={onChangeMock} helpText="Test Switch" />)

test.each([true, false])('Switch should call onChange on click', (startValue) => {
  const checkBox = getComponent(startValue)

  fireEvent.click(checkBox.getByText('Test Switch'))

  expect(onChangeMock).toBeCalledWith(!startValue)
})
