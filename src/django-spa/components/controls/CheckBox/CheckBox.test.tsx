import React from 'react'
import { render, RenderResult, fireEvent } from '@testing-library/react'

import { CheckBox } from './CheckBox'

const onChangeMock = jest.fn()

const getComponent = (value: boolean): RenderResult =>
  render(<CheckBox value={value} onChange={onChangeMock} helpText="Test CheckBox" />)

test.each([true, false])('CheckBox should call onChange on click', (startValue) => {
  const checkBox = getComponent(startValue)

  fireEvent.click(checkBox.getByText('Test CheckBox'))

  expect(onChangeMock).toBeCalledWith(!startValue)
})
